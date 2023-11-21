import { Episode } from "../../../domain/episode";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CREATE_EPISODE_USE_CASE_NAME, CreateEpisodeUseCase } from ".";
import { EpisodeWriteRepository } from "../../../domain/ports/episode-write.repository";
import { nullishOrFail } from "../../../shared/functions/nullish-or-fail";
import { EpisodeReadRepository } from "../../../domain/ports/episode-read.repository";
import { AlreadyExistsError } from "../../../errors";

export interface CreateEpisodeUseCaseDependencies {
  episodeWriteRepository: EpisodeWriteRepository;
  episodeReadRepository: EpisodeReadRepository;
}

export class CreateEpisodeUseCaseHandler
  implements UseCaseHandler<CreateEpisodeUseCase>
{
  public readonly name: string = CREATE_EPISODE_USE_CASE_NAME;

  constructor(private dependencies: CreateEpisodeUseCaseDependencies) {}

  async handle(input: CreateEpisodeUseCase) {
    const { episodeWriteRepository, episodeReadRepository } = this.dependencies;
    const { name } = input.payload;

    await nullishOrFail(
      episodeReadRepository.findByName(name),
      new AlreadyExistsError(Episode.name, "name"),
    );

    const episode = new Episode({ name });

    await episodeWriteRepository.save(episode);

    return episode;
  }
}
