import { expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { nullishOrFail } from "../nullish-or-fail";
import { AlreadyExistsError } from "../../../errors";

use(chaiAsPromised);

const error = new AlreadyExistsError("Entity Test with ID = 1 already exists");

describe("nullishOrFail", () => {
  it("should throw for a non-nullish result", async () => {
    expect(nullishOrFail(Promise.resolve("value"), error)).to.be.rejectedWith(
      AlreadyExistsError,
    );
  });

  it("should throw for a non-empty array", async () => {
    expect(nullishOrFail(Promise.resolve(["value"]), error)).to.be.rejectedWith(
      AlreadyExistsError,
    );
  });

  it("should pass for undefined", async () => {
    await nullishOrFail(Promise.resolve(undefined), error);
  });

  it("should pass for null", async () => {
    await nullishOrFail(Promise.resolve(null), error);
  });

  it("should pass for an empty array", async () => {
    await nullishOrFail(Promise.resolve([]), error);
  });
});
