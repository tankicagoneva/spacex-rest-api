import db from "../db/connection.js";

/**
 * Retrieves all launchpads from the database.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of launchpad objects.
 */
export const getAllLaunchpads = async (): Promise<any[]> => {
  const launchpads = await db.query(
    "SELECT * FROM public.launchpads ORDER BY id ASC",
    [],
  );
  return launchpads.rows;
};

/**
 * Retrieves a launchpad by ID from the database.
 *
 * @param {string} id - The ID of the launchpad to retrieve.
 * @returns {Promise<any>} A promise that resolves to the launchpad data.
 */
export const getLaunchpadById = async (id: string): Promise<any> => {
  const launchpad = await db.query(
    "SELECT * FROM public.launchpads WHERE id = $1",
    [id],
  );
  return launchpad.rows[0];
};
