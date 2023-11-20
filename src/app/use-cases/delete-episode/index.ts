import { DeleteEpisodeInputTransformed } from "../../../schema/commands/deleteEpisode/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const DELETE_EPISODE_USE_CASE_NAME = "episode/DELETE";

export type DeleteEpisodePayload = DeleteEpisodeInputTransformed["params"];

export class DeleteEpisodeUseCase implements UseCase<DeleteEpisodePayload> {
  public readonly type = USE_CASE_TYPE.COMMAND;

  public readonly name = DELETE_EPISODE_USE_CASE_NAME;

  constructor(public payload: DeleteEpisodePayload) {}
}
