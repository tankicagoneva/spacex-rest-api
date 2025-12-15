import { z } from "zod";

export const getAllLaunchpadsSchema = z.object({
  status: z.enum(["active", "retired", "under construction"]).optional(),
});
export type getAllLaunchpadsSchema = z.infer<typeof getAllLaunchpadsSchema>;

export const getClosestSchema  = z.object({
  latitude: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    },
    { message: "Invalid latitude" },
  ),
  longitude: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    },
    { message: "Invalid longitude" },
  ),
});

export type getClosestSchema = z.infer<typeof getClosestSchema >;
