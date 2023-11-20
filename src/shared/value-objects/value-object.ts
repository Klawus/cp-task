export abstract class ValueObject<T extends Record<string, unknown>> {
  protected constructor(protected readonly props: T) {}
}
