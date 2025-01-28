import db from '../db/connection.js';

// Get all launchpads
export const getAllLaunchpads = async() => {    
    const launchpads = await db.query('SELECT * FROM public.launchpads ORDER BY id ASC');
    return launchpads.rows;

};

// Get a launchpad by id
export const getLaunchpadById = async(id) => {
    const launchpad = await db.query('SELECT * FROM public.launchpads WHERE id = $1', [id]);
    return launchpad.rows[0];
};
