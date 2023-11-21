import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { ErrorCode } from "../errors";
import {
  DEFAULT_EPISODE_INPUT,
  EXISTING_EPISODE,
  NOT_EXISTING_UUID,
} from "./default-data";

describe("POST /api/episodes", () => {
  it("should create episode", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/episodes")
      .send(DEFAULT_EPISODE_INPUT);
    expect(response.body.name).to.eq(DEFAULT_EPISODE_INPUT.name);
    expect(response.status).to.eq(StatusCodes.CREATED);
  });

  it("should return error (INPUT_VALIDATION_ERROR with body.name)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/episodes")
      .send();

    expect(response.body.errorCode).to.eq(ErrorCode.INPUT_VALIDATION_ERROR);
    expect(response.body.details).to.have.property("body.name");
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });

  it("should return error (Character already exits)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/episodes")
      .send({ name: EXISTING_EPISODE.name });
    expect(response.body.errorCode).to.eq(ErrorCode.ALREADY_EXISTS_ERROR);
    expect(response.body.message).to.eq(
      "Episode with given [name] already exists",
    );
    expect(response.status).to.eq(StatusCodes.CONFLICT);
  });

  it("should return error (Name must be at least 3 characters long)", async () => {
    const response = await request(await global.container.cradle.app)
      .post("/api/episodes")
      .send({ name: "AS" });
    expect(response.body.errorCode).to.eq(ErrorCode.VALIDATION_ERROR);
    expect(response.body.message).to.eq(
      "Name must be at least 3 characters long",
    );
    expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
  });
});

describe("GET /api/episodes", () => {
  it("should get episodes with default pagination", async () => {
    const response = await request(await global.container.cradle.app).get(
      "/api/episodes",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(6);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should get only 5 episodes", async () => {
    const response = await request(await global.container.cradle.app).get(
      "/api/episodes?limit=5",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(5);
    expect(response.status).to.eq(StatusCodes.OK);
  });

  it("should return less episodes after delete", async () => {
    await request(await global.container.cradle.app).delete(
      `/api/episodes/${EXISTING_EPISODE.id.value}`,
    );

    const response = await request(await global.container.cradle.app).get(
      "/api/episodes",
    );

    expect(response.body.data).to.be.an("array");
    expect(response.body.page.count).to.eq(5);
    expect(response.status).to.eq(StatusCodes.OK);
  });
});

describe("DELETE /api/episodes/:id", () => {
  it("should delete episode", async () => {
    const response = await request(await global.container.cradle.app).delete(
      `/api/episodes/${EXISTING_EPISODE.id.value}`,
    );

    expect(response.body.name).to.eq(EXISTING_EPISODE.name);
    expect(response.status).to.eq(StatusCodes.OK);

    const responseAfterDelete = await request(
      await global.container.cradle.app,
    ).delete(`/api/episodes/${EXISTING_EPISODE.id.value}`);

    expect(responseAfterDelete.body.errorCode).to.eq(
      ErrorCode.RESOURCE_NOT_FOUND,
    );
    expect(responseAfterDelete.body.message).to.eq(
      `Resource [EpisodeEntity] with ID = [${EXISTING_EPISODE.id.value}] not found`,
    );
    expect(responseAfterDelete.status).to.eq(StatusCodes.NOT_FOUND);
  });

  it("should return error (Resource character not found)", async () => {
    const response = await request(await global.container.cradle.app).delete(
      `/api/episodes/${NOT_EXISTING_UUID.value}`,
    );

    expect(response.body.errorCode).to.eq(ErrorCode.RESOURCE_NOT_FOUND);
    expect(response.body.message).to.eq(
      `Resource [EpisodeEntity] with ID = [${NOT_EXISTING_UUID.value}] not found`,
    );
    expect(response.status).to.eq(StatusCodes.NOT_FOUND);
  });
});
