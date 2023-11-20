import { UseCaseError } from "../errors";

export enum USE_CASE_TYPE {
  QUERY = "QUERY",
  COMMAND = "COMMAND",
}

export interface UseCase<T> {
  type: USE_CASE_TYPE;
  name: string;
  payload: T;
}

export interface UseCaseHandler<T extends UseCase<any> = UseCase<any>> {
  name: string;
  handle: (UseCase: T) => Promise<any>;
}

type ResultForUseCase<
  TRegisteredUseCaseHandlers extends UseCaseHandler[],
  TUseCase extends UseCase<any>,
> = Promise<
  ReturnType<
    Extract<
      TRegisteredUseCaseHandlers[number],
      { handle: (cmd: TUseCase) => any }
    >["handle"]
  >
>;

export class UseCaseBus<
  TRegisteredUseCaseHandlers extends UseCaseHandler[] = UseCaseHandler<any>[],
> {
  private readonly availableHandlers: Record<
    string,
    TRegisteredUseCaseHandlers[number]
  >;

  constructor(useCaseHandlers: TRegisteredUseCaseHandlers) {
    this.availableHandlers = {};

    useCaseHandlers.forEach((useCaseHandler) => {
      this.availableHandlers[useCaseHandler.name] = useCaseHandler;
    }, this);
  }

  public handle<TUseCase extends UseCase<any> = any>(
    useCase: TUseCase,
  ): ResultForUseCase<TRegisteredUseCaseHandlers, TUseCase> {
    if (!this.availableHandlers[useCase.name]) {
      return Promise.reject(
        new UseCaseError(
          `UseCase [${useCase.type}]: ${useCase.name} is not supported.`,
        ),
      );
    }

    return this.availableHandlers[useCase.name].handle(useCase);
  }
}
