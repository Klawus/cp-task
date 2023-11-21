import { EntityManager, In, Repository } from "typeorm";
import { Episode } from "../../../domain/episode";
import { UUID } from "../../../shared/value-objects/uuid";
import { EpisodeEntity } from "../database/entities/episode.entity";
import {
  EpisodeReadRepository,
  GetEpisodesParams,
} from "../../../domain/ports/episode-read.repository";
import {
  DEFAULT_PAGE_REQUEST,
  Page,
  paginate,
} from "../../../shared/pagination/pagination";

interface TypeORMEpisodeReadRepositoryDependencies {
  entityManager: EntityManager;
}

export class TypeORMEpisodeReadRepository implements EpisodeReadRepository {
  private readonly repo: Repository<EpisodeEntity>;

  constructor(
    private readonly dependencies: TypeORMEpisodeReadRepositoryDependencies,
  ) {
    this.repo = this.dependencies.entityManager.getRepository(EpisodeEntity);
  }

  async findById(id: UUID): Promise<Episode | undefined> {
    return this.repo
      .findOne({ where: { id: id.value } })
      .then((it) => it?.toDomain());
  }

  async findByName(name: string): Promise<Episode | undefined> {
    return this.repo.findOne({ where: { name } }).then((it) => it?.toDomain());
  }

  async findByIds(ids: UUID[]): Promise<Episode[]> {
    const entities = await this.repo.findBy({
      id: In(ids.map((it) => it.value)),
    });

    return entities.map((it) => it.toDomain());
  }

  async findPaginated({
    page: {
      offset = DEFAULT_PAGE_REQUEST.offset,
      limit = DEFAULT_PAGE_REQUEST.limit,
    },
  }: GetEpisodesParams): Promise<Page<Episode>> {
    const [entities, totalCount] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: "DESC" },
    });

    return paginate<Episode>(
      entities.map((it) => it.toDomain()),
      { limit, offset, totalCount },
    );
  }
}
