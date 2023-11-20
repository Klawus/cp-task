import { CharacterEntity } from "../../entities/character.entity";
import { NotFoundResourceError } from "../../../errors";
import { orFail } from "../../../tools/or-fail";
import { UseCaseHandler } from "../../../tools/use-case-bus";
import { CharacterReadRepository } from "../../domain/ports/character-read.repository";
import { GET_CHARACTER_USE_CASE_NAME, GetCharacterUseCase } from "./use-case";

export interface GetCharacterUseCaseDependencies {
  characterReadRepository: CharacterReadRepository;
}

export class GetCharacterUseCaseHandler
  implements UseCaseHandler<GetCharacterUseCase>
{
  public readonly name: string = GET_CHARACTER_USE_CASE_NAME;

  constructor(private dependencies: GetCharacterUseCaseDependencies) {}

  async handle(input: GetCharacterUseCase) {
    const { characterReadRepository } = this.dependencies;
    const { id } = input.payload;

    const character = await orFail(
      characterReadRepository.findById(input.payload.id),
      new NotFoundResourceError(CharacterEntity.name, id.value),
    );

    return character;
  }
}
