import { describe, it, expect, Mock, vi, beforeEach } from "vitest";
import { NextFunction, Request, Response } from "express";


import { AnyZodObject, ZodError } from "zod";
import { createLaunchpadsSchema, getLaunchpadsByIdSchema } from "../../validators/launchpadsValidators.ts";
import { validateRequest } from "../validateRequest.ts";

describe("Validate Request Middleware", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    mockReq = {
      body: mockLaunchpad,
      query: {},
      params: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
  });

  const mockLaunchpad = {
    id: "5e9e4501f5090910d4566f877",
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
  };

  let mockReq: Partial<Request> = {};
  let mockRes: Partial<Response> = {};
  let mockNext: NextFunction = vi.fn();

  it("should validate request", async () => {
    const middleware = validateRequest(createLaunchpadsSchema);
    await middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 400 if validation fails", async () => {
    mockReq.body = { id: "AFFTGTYYJJKFFFJ456" };

    const middleware = validateRequest(createLaunchpadsSchema);
    await middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("should return proper error", async () => {
    const mockErrorSchema = {
      safeParse: vi.fn().mockImplementation(() => {
        throw new Error("Test error");
      }),
    };

    mockReq = {
      body: {},
      query: {},
      params: {},
    };

    const middleware = validateRequest(
      mockErrorSchema as unknown as AnyZodObject,
    );

    await middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(Object),
      }),
    );
  });

  it("should return Zod error", async () => {
    const zodError = new ZodError([
      {
        code: "invalid_type",
        expected: "string",
        received: "number",
        path: ["test"],
        message: "Test error",
      },
    ]);

    const mockErrorSchema = {
      safeParse: vi.fn().mockImplementation(() => {
        throw zodError;
      }),
    };

    mockReq = {
      body: {},
      query: {},
      params: {},
    };

    const middleware = validateRequest(
      mockErrorSchema as unknown as AnyZodObject,
    );

    await middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: zodError.message,
    });
  });

  it("should validate URL parameters", async () => {
    mockReq = {
      params: { id: "AFFTGTYYJJKFFFJ456" },
    };
    const middleware = validateRequest(getLaunchpadsByIdSchema);
    await middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);

    expect(mockRes.json).toHaveBeenCalled();
  });
});
