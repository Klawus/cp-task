import { StatusCodes } from "http-status-codes";
import request from "supertest";

describe("GET /health", () => {
  it("Health check test", async () => {
    return request(await global.container.cradle.app)
      .get("/health")
      .expect(StatusCodes.OK);
  });
});
