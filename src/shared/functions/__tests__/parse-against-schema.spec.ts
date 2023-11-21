import { z } from "zod";
import { expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { parseInputAgainstSchema } from "../parse-against-schema";
import { InputValidationError } from "../../../errors";

use(chaiAsPromised);

const SCHEMA = z.strictObject({
  id: z.string().uuid(),
});

describe("parseInputAgainstSchema", () => {
  it("should return parsed value", () => {
    const result = parseInputAgainstSchema(SCHEMA, {
      id: "123e4567-e89b-12d3-a456-426614174011",
    });

    expect(result.id).to.eq("123e4567-e89b-12d3-a456-426614174011");
  });

  it("should throw validation error", () => {
    expect(() =>
      parseInputAgainstSchema(SCHEMA, { id: "wrong-uuid" }),
    ).to.throw(InputValidationError);
  });
});
