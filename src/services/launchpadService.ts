import prisma from "../db/client.js";

/**
 * Retrieves all launchpads from the database.
 *
 * @returns A list of all launchpads.
 */
export const getAllLaunchpads = async () => {
  return prisma.launchpads.findMany({
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

