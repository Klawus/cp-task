import { DeleteCharacterInputTransformed } from "../../../schema/commands/deleteCharacter/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const DELETE_CHARACTER_USE_CASE_NAME = "character/DELETE";

export type DeleteCharacterPayload = DeleteCharacterInputTransformed["params"];

export class DeleteCharacterUseCase implements UseCase<DeleteCharacterPayload> {
  public readonly type = USE_CASE_TYPE.COMMAND;

  public readonly name = DELETE_CHARACTER_USE_CASE_NAME;

  constructor(public payload: DeleteCharacterPayload) {}
}
