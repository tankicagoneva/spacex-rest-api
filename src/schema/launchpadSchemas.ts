import { z } from 'zod';

export const statusSchema = z.enum(["active", "under construction", "retired"]);
export type LaunchpadStatus = z.infer<typeof statusSchema>;

export const latLngSchema = z.object({
    latitude: z.string().refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    }, { message: "Invalid latitude" }),
    longitude: z.string().refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    }, { message: "Invalid longitude" })
  });

export type LatLng = z.infer<typeof latLngSchema>;