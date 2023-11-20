import { EntityManager, Repository } from "typeorm";
import { Character } from "../../domain/character";
import { CharacterEntity } from "../../entities/character.entity";
import { CharacterWriteRepository } from "../../domain/ports/character-write.repository";

interface TypeORMCharacterWriteRepositoryDependencies {
  entityManager: EntityManager;
}

export class TypeORMCharacterWriteRepository
  implements CharacterWriteRepository
{
  private readonly repo: Repository<CharacterEntity>;

  constructor(
    private readonly dependencies: TypeORMCharacterWriteRepositoryDependencies,
  ) {
    this.repo = this.dependencies.entityManager.getRepository(CharacterEntity);
  }

  async update(character: Character): Promise<Character> {
    await this.repo.update(
      character.id.value,
      CharacterEntity.toEntity(character),
    );
    return character;
  }

  async save(character: Character): Promise<Character> {
    await this.repo.save(CharacterEntity.toEntity(character));
    return character;
  }
}
