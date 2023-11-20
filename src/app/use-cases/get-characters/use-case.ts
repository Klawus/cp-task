import { GetCharacterInputTransformed } from "../../../schema/queries/getCharacters/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../tools/use-case-bus";

export const GET_CHARACTERS_USE_CASE_NAME = "character/GET_PAGINATED";

export type GetCharactersPayload = GetCharacterInputTransformed["query"];

export class GetCharactersUseCase implements UseCase<GetCharactersPayload> {
  public readonly type = USE_CASE_TYPE.QUERY;

  public readonly name = GET_CHARACTERS_USE_CASE_NAME;

  constructor(public payload: GetCharactersPayload) {}
}
