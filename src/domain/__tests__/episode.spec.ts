import { assert, expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ValidationError } from "../../errors";
import { Episode } from "../episode";
import { UUID } from "../../shared/value-objects/uuid";

use(chaiAsPromised);

describe("episode", () => {
  it("should create character instance", async () => {
    const episode = new Episode({
      id: UUID.generate(),
      name: "Character name",
    });

    expect(episode).to.be.instanceOf(Episode);
  });

  it("should throw validation error when try to create episode with incorrect data", async () => {
    expect(
      () =>
        new Episode({
          id: UUID.generate(),
          name: "a",
        }),
    ).to.throw(ValidationError);
  });

  it("should return episode json", async () => {
    const uuid = UUID.generate();
    const episodeData = {
      name: "Episode name",
    };
    const character = new Episode({
      id: uuid,
      ...episodeData,
    });

    assert.deepEqual(character.toJSON(), {
      id: uuid.value,
      ...episodeData,
    });
  });
});
