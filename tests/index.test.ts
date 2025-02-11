import request from "supertest";
import { app, startServer } from "../src/server/index.ts";

import { describe, it, expect, afterAll, beforeAll } from "vitest";

describe("Server Test", () => {
  let server;

  beforeAll(async () => {
    process.env.PORT = "3001";
    server = await startServer();
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
  });

  it("should return 200", async () => {
    const response = await request(app).get("/api/launchpads");
    expect(response.status).toBe(200);
  });
});
