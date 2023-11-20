import { UUID } from "../../../shared/value-objects/uuid";
import { Episode } from "../episode";

export interface EpisodeWriteRepository {
  save(episode: Episode): Promise<Episode>;
  delete(id: UUID): Promise<void>;
}
