import { UseCaseHandler } from "../../../shared/use-case-bus";
import { CharacterReadRepository } from "../../../domain/ports/character-read.repository";
import { GET_CHARACTERS_USE_CASE_NAME, GetCharactersUseCase } from ".";

export interface GetCharactersUseCaseDependencies {
  characterReadRepository: CharacterReadRepository;
}

export class GetCharactersUseCaseHandler
  implements UseCaseHandler<GetCharactersUseCase>
{
  public readonly name: string = GET_CHARACTERS_USE_CASE_NAME;

  constructor(private dependencies: GetCharactersUseCaseDependencies) {}

  async handle(input: GetCharactersUseCase) {
    const { characterReadRepository } = this.dependencies;
    const { limit, offset, query } = input.payload;

    const characters = await characterReadRepository.findPaginated({
      page: { limit, offset },
      query,
    });

    return characters;
  }
}
