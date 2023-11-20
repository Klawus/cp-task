import { CreateEpisodeInputTransformed } from "../../../schema/commands/createEpisode/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const CREATE_EPISODE_USE_CASE_NAME = "episode/CREATE";

export type CreateEpisodePayload = CreateEpisodeInputTransformed["body"];

export class CreateEpisodeUseCase implements UseCase<CreateEpisodePayload> {
  public readonly type = USE_CASE_TYPE.COMMAND;

  public readonly name = CREATE_EPISODE_USE_CASE_NAME;

  constructor(public payload: CreateEpisodePayload) {}
}
