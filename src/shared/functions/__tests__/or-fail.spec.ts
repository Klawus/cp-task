import { expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { orFail } from "../or-fail";

use(chaiAsPromised);

describe("orFail", () => {
  it("should return non undefined promise value", async () => {
    const result = await orFail(
      Promise.resolve("value"),
      new Error("error message"),
    );

    expect(result).to.eq("value");
  });

  it("should throw an error for undefined promise value", async () => {
    expect(
      orFail(Promise.resolve(undefined), new Error("error message")),
    ).to.be.rejectedWith("error message");
  });

  it("should throw an error for null promise value", async () => {
    expect(
      orFail(Promise.resolve(null), new Error("error message")),
    ).to.be.rejectedWith("error message");
  });
});
