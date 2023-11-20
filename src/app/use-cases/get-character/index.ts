import { GetCharacterInputTransformed } from "../../../schema/queries/getCharacter/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const GET_CHARACTER_USE_CASE_NAME = "character/GET";

export type GetCharacterPayload = GetCharacterInputTransformed["params"];

export class GetCharacterUseCase implements UseCase<GetCharacterPayload> {
  public readonly type = USE_CASE_TYPE.QUERY;

  public readonly name = GET_CHARACTER_USE_CASE_NAME;

  constructor(public payload: GetCharacterPayload) {}
}
