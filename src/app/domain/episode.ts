import { ValidationError } from "../../errors";
import { UUID } from "../value-objects/uuid";

type EpisodeProto = {
  id?: UUID;
  name: string;
};

export type EpisodeJSON = {
  id: string;
  name: string;
};

export class Episode {
  readonly id: UUID;

  private _name: string;

  private static validate(data: EpisodeProto) {
    if (data.name.length < 4) {
      throw new ValidationError("Name must be at least 3 characters long");
    }
  }

  constructor(proto: EpisodeProto) {
    Episode.validate(proto);
    this.id = proto.id ?? UUID.generate();
    this._name = proto.name;
  }

  toJSON(): EpisodeJSON {
    return {
      id: this.id.value,
      name: this._name,
    };
  }
}
