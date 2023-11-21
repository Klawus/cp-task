import { ValidationError } from "../errors";
import { UUID } from "../shared/value-objects/uuid";
import { Episode, EpisodeJSON } from "./episode";

type CharacterProto = {
  id?: UUID;
  name: string;
  episodes?: Episode[];
};

type CharacterJSON = {
  id: string;
  name: string;
  episodes: EpisodeJSON[];
};

type UpdateCharacterCmd = Pick<CharacterProto, "name" | "episodes">;

export class Character {
  readonly id: UUID;

  private _name: string;

  private _episodes: Episode[];

  private static validate(data: UpdateCharacterCmd) {
    if (data.name.length < 4) {
      throw new ValidationError("Name must be at least 3 characters long");
    }
  }

  constructor(proto: CharacterProto) {
    Character.validate(proto);
    this.id = proto.id ?? UUID.generate();
    this._name = proto.name;
    this._episodes = proto.episodes ?? [];
  }

  get name(): string {
    return this._name;
  }

  get episodes(): Episode[] {
    return [...this._episodes];
  }

  update(changes: UpdateCharacterCmd) {
    Character.validate(changes);
    this._name = changes.name;
    this._episodes = changes.episodes ?? [];
    return this;
  }

  toJSON(): CharacterJSON {
    return {
      id: this.id.value,
      name: this._name,
      episodes: this._episodes.map((episode) => episode.toJSON()),
    };
  }
}
