import { beforeEach, expect, it, describe, vi, Mock, TestFunction } from "vitest"
import {
  getAllLaunchpads,
  getLaunchpadById,
  createLaunchpad,
  updateLaunchpad,
  deleteLaunchpad,
} from "../src/services/launchpadService"
import prisma from "../src/db/client"

vi.mock("../src/db/client", () => {
  return {
    default: {
      launchpads: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    },
  }
})

type PrismaMock = {
  launchpads: {
    findMany: Mock,
    findUnique: Mock,
    create: Mock,
    update: Mock,
    delete: Mock,
  }
}

const prismaMock = prisma as unknown as PrismaMock

describe("launchpadService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("getAllLaunchpads", () => {
    it("should return all launchpads", async () => {
      const mockLaunchpad = [
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
      ]

      prismaMock.launchpads.findMany.mockResolvedValue(mockLaunchpad)

      const result = await getAllLaunchpads()

      expect(result).toEqual(mockLaunchpad)
      expect(prisma.launchpads.findMany).toHaveBeenCalledWith({
        orderBy: { id: "asc" },
      })
    })

    it("should handle errors", async () => {
      prismaMock.launchpads.findMany.mockRejectedValue(new Error("Test error"))

      await expect(getAllLaunchpads()).rejects.toThrow("Test error")
    })
  })

  describe("getLaunchpadById", () => {
    it("should return a launchpad by ID", async () => {
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
      }

      prismaMock.launchpads.findUnique.mockResolvedValue(mockLaunchpad)

      const result = await getLaunchpadById("pad-1")

      expect(result).toEqual(mockLaunchpad)
      expect(prisma.launchpads.findUnique).toHaveBeenCalledWith({
        where: { id: "pad-1" },
      })
    })

    it("should handle errors", async () => {
      prismaMock.launchpads.findUnique.mockRejectedValue(new Error("Test error"))

      await expect(getLaunchpadById("pad-1")).rejects.toThrow("Test error")
    })
  })

  describe("createLaunchpad", () => {
    it("should create a new launchpad", async () => {
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
      }

      prismaMock.launchpads.create.mockResolvedValue(mockLaunchpad)

      const result = await createLaunchpad(mockLaunchpad)

      expect(result).toEqual(mockLaunchpad)
      expect(prisma.launchpads.create).toHaveBeenCalledWith({
        data: mockLaunchpad,
      })
    })

    it("should handle errors", async () => {
      prismaMock.launchpads.create.mockRejectedValue(new Error("Test error"))

      await expect(createLaunchpad({})).rejects.toThrow("Test error")
    })
  })

  describe("updateLaunchpad", () => {
    it("should update a launchpad by ID", async () => {
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
      }

      prismaMock.launchpads.update.mockResolvedValue(mockLaunchpad)

      const result = await updateLaunchpad("pad-1", mockLaunchpad)

      expect(result).toEqual(mockLaunchpad)
      expect(prisma.launchpads.update).toHaveBeenCalledWith({
        where: { id: "pad-1" },
        data: mockLaunchpad,
      })
    })

    it("should handle errors", async () => {
      prismaMock.launchpads.update.mockRejectedValue(new Error("Test error"))

      await expect(updateLaunchpad("pad-1", {})).rejects.toThrow("Test error")
    })
  })

  describe("deleteLaunchpad", () => {
    it("should delete a launchpad by ID", async () => {
      const mockLaunchpad = {
        id: "pad-1",
      }

      prismaMock.launchpads.delete.mockResolvedValue(mockLaunchpad)

      const result = await deleteLaunchpad("pad-1")

      expect(result).toEqual(mockLaunchpad)
      expect(prisma.launchpads.delete).toHaveBeenCalledWith({
        where: { id: "pad-1" },
      })
    })
  })
})
