import { vi,describe, it, expect, Mock } from "vitest";
import { Request, Response, NextFunction } from "express";
import { getAllLaunchpads } from "../launchpadController.ts";

// Mock the entire launchpadService module
vi.mock("../../services/launchpadService.ts", () => ({
  getAllLaunchpads: vi.fn(),
}));

// Import the mocked module
import * as launchpadService from "../../services/launchpadService.ts";

const launchpads = [
  {
    id: "5e9e4501f5090910d4566f83",
    name: "VAFB SLC 3W",
    full_name: "Vandenberg Space Force Base Space Launch Complex 3W",
    locality: "Vandenberg Space Force Base",
    region: ["California"],
    latitude: 34.6440904,
    longitude: -120.5931438,
    launch_attempts: 0,
    launch_successes: 0,
    rockets: ["5e9d0d95eda69955f709d1eb"],
    timezone: "America/Los_Angeles",
    status: "retired",
    details: "SpaceX's original west coast launch pad for Falcon 1.",
    images: { large: "https://i.imgur.com/7uXe1Kv.png" },
    launches: [],
  },
  {
    id: "5e9e4502f5090927f8566f85",
    name: "CCAFS SLC 40",
    full_name: "Cape Canaveral Space Launch Complex 40",
    locality: "Cape Canaveral",
    region: ["Florida"],
    latitude: 28.562302,
    longitude: -80.577356,
    launch_attempts: 61,
    launch_successes: 59,
    rockets: ["5e9d0d95eda69973a809d1ec"],
    timezone: "America/New_York",
    status: "active",
    details: "SpaceX primary Falcon 9 launch pad.",
    images: { large: "https://i.imgur.com/4t8X8d8.png" },
    launches: [],
  },
];

describe("getAllLaunchpads", () => {
  it("should return an array of launchpads", async () => {
    // Setup mock implementation
    (launchpadService.getAllLaunchpads as Mock).mockResolvedValue(launchpads);

    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    await getAllLaunchpads(req, res, next);

    expect(launchpadService.getAllLaunchpads).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(launchpads);
  });

  it("should handle errors", async () => {
    // Setup mock to throw an error
    (launchpadService.getAllLaunchpads as Mock).mockRejectedValue(new Error("Fetch failed"));

    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    await getAllLaunchpads(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
