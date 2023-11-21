import { orFail } from "../../../shared/functions/or-fail";
import { CharacterEntity } from "../../infra/database/entities/character.entity";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CharacterReadRepository } from "../../../domain/ports/character-read.repository";
import { DELETE_CHARACTER_USE_CASE_NAME, DeleteCharacterUseCase } from ".";
import { CharacterWriteRepository } from "../../../domain/ports/character-write.repository";
import { NotFoundResourceError } from "../../../errors";

export interface DeleteCharacterUseCaseDependencies {
  characterReadRepository: CharacterReadRepository;
  characterWriteRepository: CharacterWriteRepository;
}

export class DeleteCharacterUseCaseHandler
  implements UseCaseHandler<DeleteCharacterUseCase>
{
  public readonly name: string = DELETE_CHARACTER_USE_CASE_NAME;

  constructor(private dependencies: DeleteCharacterUseCaseDependencies) {}

  async handle(input: DeleteCharacterUseCase) {
    const { characterWriteRepository, characterReadRepository } =
      this.dependencies;
    const { id } = input.payload;

    const character = await orFail(
      characterReadRepository.findById(id),
      new NotFoundResourceError(CharacterEntity.name, id.value),
    );

    await characterWriteRepository.delete(character.id);

    return character;
  }
}
