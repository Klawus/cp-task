import { expect } from "chai";
import { UUID } from "../uuid";
import { ValidationError } from "../../../errors";

describe("uuid", () => {
  it("should parse correct UUID", () => {
    const uuid = new UUID("73f015e5-3652-42c5-8c5f-f91ba08b1b99");

    expect(UUID.isValid(uuid.value)).to.be.true;
  });

  it("should generate correct UUID", () => {
    const uuid = UUID.generate();

    expect(UUID.isValid(uuid.value)).to.be.true;
  });

  it("should throw validation error", () => {
    expect(() => new UUID("invalid")).to.throw(ValidationError);
  });
});
