import { EntityManager, ILike, Repository } from "typeorm";
import { Character } from "../../domain/character";
import { UUID } from "../../../shared/value-objects/uuid";
import { CharacterEntity } from "../../entities/character.entity";
import {
  CharacterReadRepository,
  GetCharactersParams,
} from "../../domain/ports/character-read.repository";
import {
  DEFAULT_PAGE_REQUEST,
  Page,
  paginate,
} from "../../../shared/pagination/pagination";

interface TypeORMCharacterReadRepositoryDependencies {
  entityManager: EntityManager;
}

export class TypeORMCharacterReadRepository implements CharacterReadRepository {
  private readonly repo: Repository<CharacterEntity>;

  constructor(
    private readonly dependencies: TypeORMCharacterReadRepositoryDependencies,
  ) {
    this.repo = this.dependencies.entityManager.getRepository(CharacterEntity);
  }

  async findById(id: UUID): Promise<Character | undefined> {
    return this.repo
      .findOne({ where: { id: id.value }, relations: ["episodes"] })
      .then((it) => it?.toDomain());
  }

  async findPaginated({
    page: {
      offset = DEFAULT_PAGE_REQUEST.offset,
      limit = DEFAULT_PAGE_REQUEST.limit,
    },
    query,
  }: GetCharactersParams): Promise<Page<Character>> {
    const [entities, totalCount] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: "DESC" },
      relations: ["episodes"],
      ...(query && { where: { name: ILike(`%${query}%`) } }),
    });

    return paginate<Character>(
      entities.map((it) => it.toDomain()),
      { limit, offset, totalCount },
    );
  }
}
