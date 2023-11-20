import { randomUUID } from "crypto";
import { ValidationError } from "../../errors";
import { ValueObject } from "./value-object";

export class UUID extends ValueObject<{ value: string }> {
  static readonly ERROR_CODE = "INVALID_UUID";

  get value(): string {
    return this.props.value;
  }

  constructor(value: string) {
    if (!UUID.isValid(value)) {
      throw new ValidationError(`Invalid UUID: [${value}] provided`);
    }
    super({ value });
  }

  static isValid(value: string) {
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Regex.test(value);
  }

  static generate() {
    return new UUID(randomUUID());
  }

  toJSON(): string {
    return this.props.value;
  }
}
