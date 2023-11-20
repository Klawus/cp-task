import { Character } from "../../domain/character";
import { UseCaseHandler } from "../../../tools/use-case-bus";
import { CharacterReadRepository } from "../../domain/ports/character-read.repository";
import {
  CREATE_CHARACTER_USE_CASE_NAME,
  CreateCharacterUseCase,
} from "./use-case";
import { CharacterWriteRepository } from "../../domain/ports/character-write.repository";

export interface CreateCharacterUseCaseDependencies {
  characterReadRepository: CharacterReadRepository;
  characterWriteRepository: CharacterWriteRepository;
}

export class CreateCharacterUseCaseHandler
  implements UseCaseHandler<CreateCharacterUseCase>
{
  public readonly name: string = CREATE_CHARACTER_USE_CASE_NAME;

  constructor(private dependencies: CreateCharacterUseCaseDependencies) {}

  async handle(input: CreateCharacterUseCase) {
    const { characterWriteRepository } = this.dependencies;

    const character = new Character(input.payload);

    await characterWriteRepository.save(character);

    return character;
  }
}
