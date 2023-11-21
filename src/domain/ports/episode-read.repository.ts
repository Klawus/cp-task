import { Page, PageRequest } from "../../shared/pagination/pagination";
import { UUID } from "../../shared/value-objects/uuid";
import { Episode } from "../episode";

export interface GetEpisodesParams {
  page: PageRequest;
}

export interface EpisodeReadRepository {
  findById(id: UUID): Promise<Episode | undefined>;
  findByName(name: string): Promise<Episode | undefined>;
  findByIds(ids: UUID[]): Promise<Episode[]>;
  findPaginated(params: GetEpisodesParams): Promise<Page<Episode>>;
}
