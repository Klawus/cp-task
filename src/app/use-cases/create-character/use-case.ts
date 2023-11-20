import { CreateCharacterInputTransformed } from "../../../schema/commands/createCharacter/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../tools/use-case-bus";

export const CREATE_CHARACTER_USE_CASE_NAME = "character/CREATE";

export type CreateCharacterPayload = CreateCharacterInputTransformed["body"];

export class CreateCharacterUseCase implements UseCase<CreateCharacterPayload> {
  public readonly type = USE_CASE_TYPE.COMMAND;

  public readonly name = CREATE_CHARACTER_USE_CASE_NAME;

  constructor(public payload: CreateCharacterPayload) {}
}
