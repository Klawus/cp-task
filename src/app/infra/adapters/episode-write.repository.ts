import { EntityManager, Repository } from "typeorm";
import { Episode } from "../../domain/episode";
import { EpisodeEntity } from "../../entities/episode.entity";
import { EpisodeWriteRepository } from "../../domain/ports/episode-write.repository";
import { UUID } from "../../../shared/value-objects/uuid";

interface TypeORMEpisodeWriteRepositoryDependencies {
  entityManager: EntityManager;
}

export class TypeORMEpisodeWriteRepository implements EpisodeWriteRepository {
  private readonly repo: Repository<EpisodeEntity>;

  constructor(
    private readonly dependencies: TypeORMEpisodeWriteRepositoryDependencies,
  ) {
    this.repo = this.dependencies.entityManager.getRepository(EpisodeEntity);
  }

  async save(episode: Episode): Promise<Episode> {
    await this.repo.save(EpisodeEntity.toEntity(episode));
    return episode;
  }

  async delete(id: UUID): Promise<void> {
    await this.repo.delete({ id: id.value });
  }
}
