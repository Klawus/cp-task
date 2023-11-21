import { UseCaseHandler } from "../../../shared/use-case-bus";
import { GET_EPISODES_USE_CASE_NAME, GetEpisodesUseCase } from ".";
import { EpisodeReadRepository } from "../../../domain/ports/episode-read.repository";

export interface GetEpisodesUseCaseDependencies {
  episodeReadRepository: EpisodeReadRepository;
}

export class GetEpisodesUseCaseHandler
  implements UseCaseHandler<GetEpisodesUseCase>
{
  public readonly name: string = GET_EPISODES_USE_CASE_NAME;

  constructor(private dependencies: GetEpisodesUseCaseDependencies) {}

  async handle(input: GetEpisodesUseCase) {
    const { episodeReadRepository } = this.dependencies;
    const { limit, offset } = input.payload;

    const characters = await episodeReadRepository.findPaginated({
      page: { limit, offset },
    });

    return characters;
  }
}
