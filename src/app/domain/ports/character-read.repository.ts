import { Page, PageRequest } from "../../../tools/pagination";
import { UUID } from "../../value-objects/uuid";
import { Character } from "../character";

export interface GetCharactersParams {
  page: PageRequest;
  query?: string;
}

export interface CharacterReadRepository {
  findById(id: UUID): Promise<Character | undefined>;
  findPaginated(params: GetCharactersParams): Promise<Page<Character>>;
}
