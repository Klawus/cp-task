import { expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { spy } from "sinon";
import { AwilixContainer, Resolver } from "awilix";
import { asArray } from "../as-array";

use(chaiAsPromised);

describe("asArray", () => {
  it("should build all resolvers", async () => {
    const spyFunction = spy();

    asArray<any>([
      {} as Resolver<any>,
      {} as Resolver<any>,
      {} as Resolver<any>,
    ]).resolve({
      build: spyFunction as any,
    } as AwilixContainer);

    expect(spyFunction.callCount).to.be.equal(3);
  });
});
