import { Episode } from "../../domain/episode";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CREATE_EPISODE_USE_CASE_NAME, CreateEpisodeUseCase } from ".";
import { EpisodeWriteRepository } from "../../domain/ports/episode-write.repository";

export interface CreateEpisodeUseCaseDependencies {
  episodeWriteRepository: EpisodeWriteRepository;
}

export class CreateEpisodeUseCaseHandler
  implements UseCaseHandler<CreateEpisodeUseCase>
{
  public readonly name: string = CREATE_EPISODE_USE_CASE_NAME;

  constructor(private dependencies: CreateEpisodeUseCaseDependencies) {}

  async handle(input: CreateEpisodeUseCase) {
    const { episodeWriteRepository } = this.dependencies;

    const episode = new Episode(input.payload);

    await episodeWriteRepository.save(episode);

    return episode;
  }
}
