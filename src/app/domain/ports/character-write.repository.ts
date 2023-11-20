import { UUID } from "../../../shared/value-objects/uuid";
import { Character } from "../character";

export interface CharacterWriteRepository {
  save(character: Character): Promise<Character>;
  delete(id: UUID): Promise<void>;
}
