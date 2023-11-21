import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Character } from "../../../../domain/character";
import { BaseEntity } from "./base.entity";
import { UUID } from "../../../../shared/value-objects/uuid";
import { EpisodeEntity } from "./episode.entity";

@Entity({ name: "characters" })
export class CharacterEntity extends BaseEntity {
  @PrimaryColumn("uuid")
  readonly id: string = UUID.generate().value;

  @Column()
  name!: string;

  @ManyToMany(() => EpisodeEntity, { cascade: true })
  @JoinTable()
  episodes?: EpisodeEntity[];

  toDomain(): Character {
    return new Character({
      id: new UUID(this.id),
      name: this.name,
      episodes: this.episodes?.map((it) => it.toDomain()),
    });
  }

  static toEntity(character: Character): CharacterEntity {
    const episodes = character.episodes?.map((it) =>
      EpisodeEntity.toEntity(it),
    );

    const data = {
      ...character.toJSON(),
      episodes,
    };

    return Object.assign(new CharacterEntity(), data);
  }
}
