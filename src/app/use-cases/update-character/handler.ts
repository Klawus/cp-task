import { CharacterEntity } from "../../entities/character.entity";
import { orFail } from "../../../shared/functions/or-fail";
import { NotFoundResourceError, ValidationError } from "../../../errors";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CharacterReadRepository } from "../../domain/ports/character-read.repository";
import { UPDATE_CHARACTER_USE_CASE_NAME, UpdateCharacterUseCase } from ".";
import { CharacterWriteRepository } from "../../domain/ports/character-write.repository";
import { EpisodeReadRepository } from "../../domain/ports/episode-read.repository";

export interface UpdateCharacterUseCaseDependencies {
  characterReadRepository: CharacterReadRepository;
  characterWriteRepository: CharacterWriteRepository;
  episodeReadRepository: EpisodeReadRepository;
}

export class UpdateCharacterUseCaseHandler
  implements UseCaseHandler<UpdateCharacterUseCase>
{
  public readonly name: string = UPDATE_CHARACTER_USE_CASE_NAME;

  constructor(private dependencies: UpdateCharacterUseCaseDependencies) {}

  async handle(input: UpdateCharacterUseCase) {
    const {
      characterWriteRepository,
      characterReadRepository,
      episodeReadRepository,
    } = this.dependencies;
    const { id, name, episodeIds } = input.payload;

    const character = await orFail(
      characterReadRepository.findById(id),
      new NotFoundResourceError(CharacterEntity.name, id.value),
    );

    const episodes = await episodeReadRepository.findByIds(episodeIds);

    if (episodes.length !== episodeIds.length) {
      throw new ValidationError("One of episodes doesn't exist");
    }

    character.update({ name, episodes });

    await characterWriteRepository.save(character);

    return character;
  }
}
