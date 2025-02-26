import request from "supertest"
import { app } from "./index.ts"

vi.mock('../controllers/launchpadController.ts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../controllers/launchpadController.ts')>()),
  getAllLaunchpads: vi.fn().mockImplementation(async (req: Request, res: Response, next: NextFunction) => { res.status(200).json({ something: 'value' }) })
}))


import { vi, describe, it, expect } from "vitest"
import { NextFunction, Response } from "express"


describe("Server Test", () => {

  it("should return 200", async () => {
    const response = await request(app).get("/api/launchpads")

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ something: 'value' })
  })
})
