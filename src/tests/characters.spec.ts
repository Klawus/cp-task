import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { ErrorCode } from "../errors";
import {
  DEFAULT_CHARACTER_INPUT,
  EXISTING_CHARACTER,
  EXISTING_EPISODE,
  NOT_EXISTING_UUID,
} from "./default-data";

describe("GET /api/characters/:id", () => {
  it("should get existing character", async () => {
    const response = await request(await global.container.cradle.app).get(
      `/api/characters/${EXISTING_CHARACTER.id.value}`,
    );
    expect(response.body.name).to.eq(EXISTING_CHARACTER.name);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should return error (Resource character not found)", async () => {
    const response = await request(await global.container.cradle.app).get(
      `/api/characters/${NOT_EXISTING_UUID.value}`,
    );

    expect(response.body.errorCode).to.eq(ErrorCode.RESOURCE_NOT_FOUND);
    expect(response.body.message).to.eq(
      `Resource [CharacterEntity] with ID = [${NOT_EXISTING_UUID.value}] not found`,
    );
    expect(response.status).to.eq(StatusCodes.NOT_FOUND);
  });
});

describe("DELETE /api/characters/:id", () => {
  it("should delete character", async () => {
    const response = await request(await global.container.cradle.app).delete(
      `/api/characters/${EXISTING_CHARACTER.id.value}`,
    );

    expect(response.body.name).to.eq(EXISTING_CHARACTER.name);
    expect(response.status).to.eq(StatusCodes.OK);

    const responseAfterDelete = await request(
      await global.container.cradle.app,
    ).get(`/api/characters/${EXISTING_CHARACTER.id.value}`);

    expect(responseAfterDelete.body.errorCode).to.eq(
      ErrorCode.RESOURCE_NOT_FOUND,
    );
    expect(responseAfterDelete.body.message).to.eq(
      `Resource [CharacterEntity] with ID = [${EXISTING_CHARACTER.id.value}] not found`,
    );
    expect(responseAfterDelete.status).to.eq(StatusCodes.NOT_FOUND);
  });

  it("should return error (Resource character not found)", async () => {
    const response = await request(await global.container.cradle.app).get(
      `/api/characters/${NOT_EXISTING_UUID.value}`,
    );

    expect(response.body.errorCode).to.eq(ErrorCode.RESOURCE_NOT_FOUND);
    expect(response.body.message).to.eq(
      `Resource [CharacterEntity] with ID = [${NOT_EXISTING_UUID.value}] not found`,
    );
    expect(response.status).to.eq(StatusCodes.NOT_FOUND);
  });
});

describe("POST /api/characters", () => {
  it("should create character", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send(DEFAULT_CHARACTER_INPUT);
    expect(response.body.name).to.eq(DEFAULT_CHARACTER_INPUT.name);
    expect(response.status).to.eq(StatusCodes.CREATED);
  });

  it("should create character with episode", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send({
        ...DEFAULT_CHARACTER_INPUT,
        episodeIds: [EXISTING_EPISODE.id.value],
      });

    expect(response.body.name).to.eq(DEFAULT_CHARACTER_INPUT.name);
    expect(response.body.episodes[0].id).to.eq(EXISTING_EPISODE.id.value);
    expect(response.status).to.eq(StatusCodes.CREATED);
  });

  it("should create character with only name", async () => {
    const { name } = DEFAULT_CHARACTER_INPUT;

    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send({ name });

    expect(response.body.name).to.eq(name);
    expect(response.status).to.eq(StatusCodes.CREATED);
  });

  it("should return error (INPUT_VALIDATION_ERROR with body.name)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send();

    expect(response.body.errorCode).to.eq(ErrorCode.INPUT_VALIDATION_ERROR);
    expect(response.body.details).to.have.property("body.name");
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (One of episodes doesn't exist)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send({
        ...DEFAULT_CHARACTER_INPUT,
        episodeIds: ["11b36b0c-8724-11ee-b9d1-0242ac120002"],
      });

    expect(response.body.errorCode).to.eq(ErrorCode.VALIDATION_ERROR);
    expect(response.body.message).to.eq("One of episodes doesn't exist");
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (Name must be at least 3 characters long)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send({ name: "AS" });
    expect(response.body.errorCode).to.eq(ErrorCode.VALIDATION_ERROR);
    expect(response.body.message).to.eq(
      "Name must be at least 3 characters long",
    );
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (Character already exits)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/characters")
      .send({ name: EXISTING_CHARACTER.name });
    expect(response.body.errorCode).to.eq(ErrorCode.ALREADY_EXISTS_ERROR);
    expect(response.body.message).to.eq(
      "Character with given [name] already exists",
    );
    expect(response.status).to.eq(StatusCodes.CONFLICT);
  });
});

describe("PUT /api/characters/:id", () => {
  it("should update character", async () => {
    const newName = "New Name";
    const response = await request(await global.container.cradle.app)
      .put(`/api/characters/${EXISTING_CHARACTER.id.value}`)
      .send({ name: "New Name" });

    expect(response.body.name).to.eq(newName);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should return error (Resource character not found)", async () => {
    const response = await request(await global.container.cradle.app)
      .put(`/api/characters/${NOT_EXISTING_UUID.value}`)
      .send({ name: "New Name" });

    expect(response.body.errorCode).to.eq(ErrorCode.RESOURCE_NOT_FOUND);
    expect(response.body.message).to.eq(
      `Resource [CharacterEntity] with ID = [${NOT_EXISTING_UUID.value}] not found`,
    );
    expect(response.status).to.eq(StatusCodes.NOT_FOUND);
  });

  it("should return error (INPUT_VALIDATION_ERROR with body.name)", async () => {
    const response = await request(await global.container.cradle.app)
      .put(`/api/characters/${NOT_EXISTING_UUID.value}`)
      .send();

    expect(response.body.errorCode).to.eq(ErrorCode.INPUT_VALIDATION_ERROR);
    expect(response.body.details).to.have.property("body.name");
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (One of episodes doesn't exist)", async () => {
    const response = await request(await global.container.cradle.app)
      .put(`/api/characters/${EXISTING_CHARACTER.id.value}`)
      .send({
        ...DEFAULT_CHARACTER_INPUT,
        episodeIds: ["11b36b0c-8724-11ee-b9d1-0242ac120002"],
      });

    expect(response.body.errorCode).to.eq(ErrorCode.VALIDATION_ERROR);
    expect(response.body.message).to.eq("One of episodes doesn't exist");
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (Name must be at least 3 characters long)", async () => {
    const response = await request(await global.container.cradle.app)
      .put(`/api/characters/${EXISTING_CHARACTER.id.value}`)
      .send({ name: "AS" });
    expect(response.body.errorCode).to.eq(ErrorCode.VALIDATION_ERROR);
    expect(response.body.message).to.eq(
      "Name must be at least 3 characters long",
    );
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });
});

describe("GET /api/characters", () => {
  it("should get characters with default pagination", async () => {
    const response = await request(await global.container.cradle.app).get(
      "/api/characters",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(6);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should get only 5 characters", async () => {
    const response = await request(await global.container.cradle.app).get(
      "/api/characters?limit=5",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(5);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should get only character which contains 1 in name", async () => {
    const response = await request(await global.container.cradle.app).get(
      "/api/characters?query=1",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.data[0].name).to.eq("Test 1 Character");
    expect(response.body.page.count).to.eq(1);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should return less characters after delete", async () => {
    await request(await global.container.cradle.app).delete(
      `/api/characters/${EXISTING_CHARACTER.id.value}`,
    );

    const response = await request(await global.container.cradle.app).get(
      "/api/characters",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(5);
    expect(response.status).to.eq(StatusCodes.OK);
  });
});
