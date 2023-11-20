import { orFail } from "../../../shared/functions/or-fail";
import { EpisodeEntity } from "../../entities/episode.entity";
import { UseCaseHandler } from "../../../shared/use-case-bus";
import { EpisodeReadRepository } from "../../domain/ports/episode-read.repository";
import { DELETE_EPISODE_USE_CASE_NAME, DeleteEpisodeUseCase } from ".";
import { EpisodeWriteRepository } from "../../domain/ports/episode-write.repository";
import { NotFoundResourceError } from "../../../errors";

export interface DeleteEpisodeUseCaseDependencies {
  episodeReadRepository: EpisodeReadRepository;
  episodeWriteRepository: EpisodeWriteRepository;
}

export class DeleteEpisodeUseCaseHandler
  implements UseCaseHandler<DeleteEpisodeUseCase>
{
  public readonly name: string = DELETE_EPISODE_USE_CASE_NAME;

  constructor(private dependencies: DeleteEpisodeUseCaseDependencies) {}

  async handle(input: DeleteEpisodeUseCase) {
    const { episodeWriteRepository, episodeReadRepository } = this.dependencies;
    const { id } = input.payload;

    const episode = await orFail(
      episodeReadRepository.findById(id),
      new NotFoundResourceError(EpisodeEntity.name, id.value),
    );

    await episodeWriteRepository.delete(episode.id);

    return episode;
  }
}
