import { Character } from "../../domain/character";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CREATE_CHARACTER_USE_CASE_NAME, CreateCharacterUseCase } from ".";
import { CharacterWriteRepository } from "../../domain/ports/character-write.repository";
import { EpisodeReadRepository } from "../../domain/ports/episode-read.repository";
import { ValidationError } from "../../../errors";

export interface CreateCharacterUseCaseDependencies {
  characterWriteRepository: CharacterWriteRepository;
  episodeReadRepository: EpisodeReadRepository;
}

export class CreateCharacterUseCaseHandler
  implements UseCaseHandler<CreateCharacterUseCase>
{
  public readonly name: string = CREATE_CHARACTER_USE_CASE_NAME;

  constructor(private dependencies: CreateCharacterUseCaseDependencies) {}

  async handle(input: CreateCharacterUseCase) {
    const { characterWriteRepository, episodeReadRepository } =
      this.dependencies;
    const { name, episodeIds } = input.payload;

    const episodes = await episodeReadRepository.findByIds(episodeIds);

    if (episodes.length !== episodeIds.length) {
      throw new ValidationError("One of episodes doesn't exist");
    }

    const character = new Character({ name, episodes });

    await characterWriteRepository.save(character);

    return character;
  }
}
