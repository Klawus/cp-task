import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Episode } from "../domain/episode";
import { UUID } from "../value-objects/uuid";

@Entity({ name: "episodes" })
export class EpisodeEntity extends BaseEntity {
  @PrimaryColumn("uuid")
  readonly id: string = UUID.generate().value;

  @Column()
  name!: string;

  toDomain(): Episode {
    return new Episode({
      id: new UUID(this.id),
      name: this.name,
    });
  }

  static toEntity(episode: Episode): EpisodeEntity {
    return Object.assign(new EpisodeEntity(), episode.toJSON());
  }
}
