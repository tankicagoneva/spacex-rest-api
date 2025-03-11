import request from "supertest"
import { app } from "../../server/index.ts"
import { vi, describe, it, expect } from "vitest"
import { NextFunction, Response } from "express"

vi.mock('../../controllers/launchpadController.ts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../controllers/launchpadController.ts')>()),
  getAllLaunchpads: vi.fn().mockImplementation(async (req: Request, res: Response, next: NextFunction) => { res.status(200).json([{ id: '5e9e4501f5090910d4566f83' }]) }),
  getLaunchpadById: vi.fn().mockImplementation(async (req: Request, res: Response, next: NextFunction) => { res.status(200).json({ id: '5e9e4501f5090910d4566f83' }) })
}))


describe("Launchpad Routes", () => {
  it("should return all launchpads", async () => {
    const response = await request(app).get("/api/launchpads")
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].id).toBe("5e9e4501f5090910d4566f83")
  })

  it("should return a single launchpad", async () => {
    const response = await request(app).get(
      "/api/launchpads/5e9e4501f5090910d4566f83",
    )
    expect(response.status).toBe(200)
    expect(response.body.id).toBe("5e9e4501f5090910d4566f83")
  })

  // it("should return a 404 if launchpad not found", async () => {
  //   const response = await request(app).get(
  //     "/api/launchpads/5e9e4501f5090910d4566f84",
  //   )
  //   expect(response.status).toBe(404)
  //   expect(response.body.message).toBe(
  //     "Launchpad with id 5e9e4501f5090910d4566f84 not found",
  //   )
  // })
})
