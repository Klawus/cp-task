import { Character } from "../character";

export interface CharacterWriteRepository {
  save(company: Character): Promise<Character>;
  update(company: Character): Promise<Character>;
}
