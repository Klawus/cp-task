import { GetEpisodesInputTransformed } from "../../../schema/queries/getEpisodes/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const GET_EPISODES_USE_CASE_NAME = "episodes/GET_PAGINATED";

export type GetEpisodesPayload = GetEpisodesInputTransformed["query"];

export class GetEpisodesUseCase implements UseCase<GetEpisodesPayload> {
  public readonly type = USE_CASE_TYPE.QUERY;

  public readonly name = GET_EPISODES_USE_CASE_NAME;

  constructor(public payload: GetEpisodesPayload) {}
}
