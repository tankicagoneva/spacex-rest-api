import { NextFunction, Request, Response } from "express";
import { vi, describe, it, expect, beforeEach } from "vitest";
import {
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
  getAllLaunchpads,
  getLaunchpadsByClosest,
} from "../launchpadController.ts";
import * as launchpadService from "../../services/launchpadService.ts";

vi.mock("../../services/launchpadService.ts");

describe("launchpadController", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {} as Request;
    mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
      end: vi.fn(),
    } as unknown as Response;
    mockNext = vi.fn();
  });

  describe("getAllLaunchpads", () => {
    it("should return all launchpads", async () => {
      mockReq.query = {status: 'active'};
      const mockLaunchpads = [
        {
          id: "pad-1",
          status: "active",
          name: "Test Pad",
          full_name: "Test Launch Pad",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: null,
          longitude: null,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        },
        {
          id: "pad-2",
          status: "active",
          name: "Test Pad 2",
          full_name: "Test Launch Pad 2",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: null,
          longitude: null,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        },
      ];

      vi.mocked(launchpadService.getAllLaunchpads).mockResolvedValue(
        mockLaunchpads,
      );

      await getAllLaunchpads(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockLaunchpads);
    });

    it("should handle errors", async () => {
      mockReq.query = {status: 'active'};

      const error = new Error("Database error");

      vi.mocked(launchpadService.getAllLaunchpads).mockRejectedValue(error);

      await getAllLaunchpads(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("getLaunchpadById", () => {
    it("should return a launchpad by id", async () => {
      const mockLaunchpad = {
        id: "pad-1",
        status: "active",
        name: "Test Pad",
        full_name: "Test Launch Pad",
        locality: "Test Locality",
        region: ["Test Region"],
        latitude: null,
        longitude: null,
        launch_attempts: null,
        launch_successes: null,
        rockets: [],
        launches: [],
        timezone: "UTC",
        details: "Test details",
        images: [],
      };
      mockReq.params = { id: "pad-1" };

      vi.mocked(launchpadService.getLaunchpadById).mockResolvedValue(
        mockLaunchpad,
      );

      await getLaunchpadById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockLaunchpad);
    });

    it("should return 404 when launchpad not found", async () => {
      mockReq.params = { id: "invalid-id" };

      vi.mocked(launchpadService.getLaunchpadById).mockResolvedValue(null);

      await getLaunchpadById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Launchpad with id invalid-id not found",
      });
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "123" };
      const error = new Error("Database error");

      vi.mocked(launchpadService.getLaunchpadById).mockRejectedValue(error);

      await getLaunchpadById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
    });

    describe("createLaunchpad", () => {
      it("should create a new launchpad", async () => {
        const mockLaunchpad = {
          id: "pad-2",
          status: "active",
          name: "New Pad",
          full_name: "New Launch Pad",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: null,
          longitude: null,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        };

        vi.mocked(launchpadService.createLaunchpad).mockResolvedValue(
          mockLaunchpad,
        );

        await createLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockLaunchpad);
      });

      it("should handle errors", async () => {
        const error = new Error("Database error");

        vi.mocked(launchpadService.createLaunchpad).mockRejectedValue(error);

        await createLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
      });
    });

    describe("updateLaunchpad", () => {
      it("should update a launchpad by id", async () => {
        const mockLaunchpad = {
          id: "pad-3",
          status: "active",
          name: "Updated Pad",
          full_name: "Updated Launch Pad",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: null,
          longitude: null,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        };
        mockReq.params = { id: "pad-3" };

        vi.mocked(launchpadService.updateLaunchpad).mockResolvedValue(
          mockLaunchpad,
        );

        await updateLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLaunchpad);
      });

      it("should handle errors", async () => {
        mockReq.params = { id: "123" };
        const error = new Error("Database error");

        vi.mocked(launchpadService.updateLaunchpad).mockRejectedValue(error);

        await updateLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
      });
    });

    describe("deleteLaunchpad", () => {
      it("should delete a launchpad by id", async () => {
        mockReq.params = { id: "pad-4" };

        const mockDeletedLaunchpad = {
          id: "pad-4",
          status: "active",
          name: "Deleted Pad",
          full_name: "Deleted Launch Pad",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: null,
          longitude: null,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Deleted details",
          images: [],
        };

        vi.mocked(launchpadService.deleteLaunchpad).mockResolvedValue(
          mockDeletedLaunchpad,
        );

        await deleteLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
          message: `Launchpad with id pad-4 deleted`,
        });
      });

      it("should handle errors", async () => {
        mockReq.params = { id: "123" };
        const error = new Error("Database error");

        vi.mocked(launchpadService.deleteLaunchpad).mockRejectedValue(error);

        await deleteLaunchpad(
          mockReq as Request,
          mockRes as Response,
          mockNext,
        );

        expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
      });
    });
  });

  describe("getLaunchpadsByClosest", () => {
    it("should return launchpads sorted by closest distance to given coordinates", async () => {
      mockReq.query = { latitude: '23.435', longitude: '45.234' };
      const mockClosestLaunchpads = [
        {
          id: "pad-1",
          status: "active",
          name: "Test Pad",
          full_name: "Test Launch Pad",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: 23.435,
          longitude: 45.234,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        },
        {
          id: "pad-2",
          status: "active",
          name: "Test Pad 2",
          full_name: "Test Launch Pad 2",
          locality: "Test Locality",
          region: ["Test Region"],
          latitude: 28.5728,
          longitude: 77.234,
          launch_attempts: null,
          launch_successes: null,
          rockets: [],
          launches: [],
          timezone: "UTC",
          details: "Test details",
          images: [],
        },
      ];

      vi.mocked(launchpadService.getLaunchpadsByClosest).mockResolvedValue(
        mockClosestLaunchpads,
      );

      await getLaunchpadsByClosest(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockClosestLaunchpads);
    });

    it("should handle errors", async () => {
      mockReq.query = { latitude: '23.435', longitude: '45.234' };
      const error = new Error("Database error");

      vi.mocked(launchpadService.getLaunchpadsByClosest).mockRejectedValue(
        error,
      );

      await getLaunchpadsByClosest(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(new Error("Database error"));
    });

    it("should return 400 if latitude or longitude is missing", async () => {
      mockReq.query = { latitude: '23.435' };

      await getLaunchpadsByClosest(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid coordinates",
        error: '[{"code":"invalid_type","expected":"string","received":"undefined","path":["longitude"],"message":"Required"}]',
       });
    });

    it("should return 400 if latitude or longitude is invalid", async () => {
      mockReq.query = { latitude: '159.89', longitude: '230.56' };

      await getLaunchpadsByClosest(
        mockReq as Request,
        mockRes as Response,
        mockNext,
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid coordinates",
        error: '[{"code":"custom","message":"Invalid latitude","path":["latitude"]},{"code":"custom","message":"Invalid longitude","path":["longitude"]}]',
      });
    });

  });
});
