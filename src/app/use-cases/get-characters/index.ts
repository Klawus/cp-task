import { GetCharactersInputTransformed } from "../../../schema/queries/getCharacters/1.0.0";
import { UseCase, USE_CASE_TYPE } from "../../../shared/use-case-bus";

export const GET_CHARACTERS_USE_CASE_NAME = "characters/GET_PAGINATED";

export type GetCharactersPayload = GetCharactersInputTransformed["query"];

export class GetCharactersUseCase implements UseCase<GetCharactersPayload> {
  public readonly type = USE_CASE_TYPE.QUERY;

  public readonly name = GET_CHARACTERS_USE_CASE_NAME;

  constructor(public payload: GetCharactersPayload) {}
}
