import request from "supertest"
import { app } from "../src/server/index.ts"

vi.mock('../src/controllers/launchpadController.ts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../src/controllers/launchpadController.ts')>()),
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
