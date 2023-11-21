import { assert, expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ValidationError } from "../../errors";
import { Character } from "../character";
import { UUID } from "../../shared/value-objects/uuid";

use(chaiAsPromised);

describe("character", () => {
  it("should create character instance", async () => {
    const character = new Character({
      id: UUID.generate(),
      name: "Character name",
      episodes: [],
    });

    expect(character).to.be.instanceOf(Character);
  });

  it("should throw validation error when try to create character with incorrect data", async () => {
    expect(
      () =>
        new Character({
          id: UUID.generate(),
          name: "a",
          episodes: [],
        }),
    ).to.throw(ValidationError);
  });

  it("should throw validation error when try to update character with incorrect data", async () => {
    const character = new Character({
      id: UUID.generate(),
      name: "Test Character",
      episodes: [],
    });

    expect(() => character.update({ name: "a" })).to.throw(ValidationError);
  });

  it("should update character", async () => {
    const newName = "New name";
    const character = new Character({
      id: UUID.generate(),
      name: "Character name",
      episodes: [],
    });

    character.update({ name: newName });

    expect(character).to.be.instanceOf(Character);
    expect(character.name).to.eq(newName);
  });

  it("should return character json", async () => {
    const uuid = UUID.generate();
    const characterData = {
      name: "Character name",
      episodes: [],
    };
    const character = new Character({
      id: uuid,
      ...characterData,
    });

    assert.deepEqual(character.toJSON(), {
      id: uuid.value,
      ...characterData,
    });
  });
});
