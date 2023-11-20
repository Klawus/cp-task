import { UpdateCharacterInputTransformed } from "../../../schema/commands/updateCharacter/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const UPDATE_CHARACTER_USE_CASE_NAME = "character/UPDATE";

export type UpdateCharacterPayload = UpdateCharacterInputTransformed["params"] &
  UpdateCharacterInputTransformed["body"];

export class UpdateCharacterUseCase implements UseCase<UpdateCharacterPayload> {
  public readonly type = USE_CASE_TYPE.COMMAND;

  public readonly name = UPDATE_CHARACTER_USE_CASE_NAME;

  constructor(public payload: UpdateCharacterPayload) {}
}
