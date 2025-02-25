import exp from "constants";
import { z } from "zod";

export const createLaunchpadsSchema = z.object({
  body: z.object({
    id: z.string().regex(/^[a-z0-9]+$/, {
      message: "ID must contain only lowercase letters and numbers",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    full_name: z.string({
      required_error: "Full Name is required",
    }),
    status: z.enum(["active", "under construction", "retired"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be active, inactive or retired",
    }),
    locality: z.string({
      required_error: "Locality must be a string",
    }),
    region: z.array(
      z.string({
        required_error: "Region must be a string",
      }),
    ),
    latitude: z.number({
      required_error: "Latitude must be a number",
    }),
    longitude: z.number({
      required_error: "Longitude must be a number",
    }),
    launch_attempts: z.number({
      required_error: "Launch Attempts must be a number",
    }),
    launch_successes: z.number({
      required_error: "Launch Successes must be a number",
    }),
    rockets: z.array(
      z.string({
        required_error: "Rockets must be a string",
      }),
    ),
    timezone: z.string({
      required_error: "Timezone must be a string",
    }),
    details: z.string({
      required_error: "Details must be a string",
    }),
    images: z.object({
      large: z.string({
        required_error: "Must be a URL",
      }),
    }),
    launches: z.array(
      z.string({
        required_error: "Launches must be a string",
      }),
    ),
  }),
});


export const updateLaunchpadsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-z0-9]+$/, {
      message: "ID must contain only lowercase letters and numbers",
    }),
  })
});

export const getLaunchpadsByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-z0-9]+$/, {
      message: "ID must contain only lowercase letters and numbers",
    }),
  })
});