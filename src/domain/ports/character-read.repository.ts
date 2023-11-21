import { Page, PageRequest } from "../../shared/pagination/pagination";
import { UUID } from "../../shared/value-objects/uuid";
import { Character } from "../character";

export interface GetCharactersParams {
  page: PageRequest;
  query?: string;
}

export interface CharacterReadRepository {
  findById(id: UUID): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
  findPaginated(params: GetCharactersParams): Promise<Page<Character>>;
}
