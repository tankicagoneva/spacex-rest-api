import prisma from "../db/client.ts";
import { getClosestSchema, getAllLaunchpadsSchema } from "../schema/launchpadSchemas.ts";
import { calculateDistance } from "../utils/geoLocation.ts";

/**
 * Retrieves all launchpads from the database and filters them by status if provided.
 *
 * @returns A list of all launchpads.
 * @param getAllLaunchpads - The status to filter the launchpads by.
 */
export const getAllLaunchpads = async (getAllLaunchpads?: getAllLaunchpadsSchema) => {
  return prisma.launchpads.findMany({
    where: getAllLaunchpads ? { status: getAllLaunchpads.status } : undefined,
    orderBy: {
      id: "asc",
    },
  });
};

/**
 * Retrieves a launchpad by its ID.
 *
 * @param id - The ID of the launchpad to retrieve.
 * @returns The launchpad with the specified ID.
 */
export const getLaunchpadById = async (id: string) => {
  return prisma.launchpads.findUnique({
    where: {
      id: id,
    },
  });
};

/**
 * Creates a new launchpad.
 *
 * @param launchpad - The launchpad to create.
 * @returns The new created launchpad.
 */
export const createLaunchpad = async (launchpad: any) => {
  return prisma.launchpads.create({
    data: launchpad,
  });
};

/**
 * Updates a launchpad by its ID.
 *
 * @param id - The ID of the launchpad to update.
 * @param launchpad - The updated launchpad data.
 * @returns The updated launchpad.
 */
export const updateLaunchpad = async (id: string, launchpad: any) => {
  return prisma.launchpads.update({
    where: {
      id: id,
    },
    data: launchpad,
  });
};

/**
 * Deletes a launchpad by its ID.
 *
 * @param id - The ID of the launchpad to delete.
 * @returns The deleted launchpad.
 */
export const deleteLaunchpad = async (id: string) => {
  return prisma.launchpads.delete({
    where: {
      id: id,
    },
  });
};

/**
 * Retrieves the closest launchpad to the user's location.
 *
 * @param getClosestSchema - The user's location.
 * @returns The closest launchpad to the user.
 */

export const getLaunchpadsByClosest = async (getClosestSchema: getClosestSchema) => {
  const userLatitude = parseFloat(getClosestSchema.latitude);
  const userLongitude = parseFloat(getClosestSchema.longitude);

  const launchpads = await prisma.launchpads.findMany();

  const closestLaunchpads = launchpads.map((launchpad) => ({
    ...launchpad,
    distance: calculateDistance(
      userLatitude,
      userLongitude,
      Number(launchpad.latitude),
      Number(launchpad.longitude),
    ),
  }));

  return closestLaunchpads.reduce((closest, current) =>
    closest.distance <= current.distance ? closest : current,
  );
};
