import request from "supertest";
import { app } from "../src/server/index.ts";
import { describe, it, expect } from "vitest";

describe("Launchpad Routes", () => {
  it("should return all launchpads", async () => {
    const response = await request(app).get("/api/launchpads");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBe("5e9e4501f5090910d4566f83");
  });

  it("should return a single launchpad", async () => {
    const response = await request(app).get(
      "/api/launchpads/5e9e4501f5090910d4566f83",
    );
    expect(response.status).toBe(200);
    expect(response.body.id).toBe("5e9e4501f5090910d4566f83");
  });

  it("should return a 404 if launchpad not found", async () => {
    const response = await request(app).get(
      "/api/launchpads/5e9e4501f5090910d4566f84",
    );
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Launchpad with id 5e9e4501f5090910d4566f84 not found",
    );
  });
});
