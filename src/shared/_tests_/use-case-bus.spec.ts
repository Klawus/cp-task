import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  USE_CASE_TYPE,
  UseCase,
  UseCaseBus,
  UseCaseHandler,
} from "../use-case-bus";

use(chaiAsPromised);

export default class TestHandler implements UseCaseHandler<UseCase<string>> {
  public name: string = "test-name";

  public type = USE_CASE_TYPE.COMMAND;

  async handle(command: UseCase<string>) {
    return `handler-message ${command.payload}`;
  }
}

describe("use-bus", () => {
  it("throws error if no handler found", async () => {
    const bus = new UseCaseBus([]);
    const testUseCase: UseCase<string> = {
      payload: "payload-data",
      name: "test-name",
      type: USE_CASE_TYPE.QUERY,
    };

    await expect(bus.handle(testUseCase)).to.be.rejectedWith(
      "UseCase [QUERY]: test-name is not supported.",
    );
  });

  it("executes matched handler if found", async () => {
    const bus = new UseCaseBus([new TestHandler()]);
    const testUseCase: UseCase<string> = {
      payload: "payload-data",
      type: USE_CASE_TYPE.COMMAND,
      name: "test-name",
    };

    expect(await bus.handle(testUseCase)).to.be.equal(
      "handler-message payload-data",
    );
  });
});
