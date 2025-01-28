import * as launchpadService from '../services/launchpadService.js';

export const getAllLaunchpads = async (req, res, next) => {    
    try{
        const launchpads = launchpadService.getAllLaunchpads();
        return res.status(200).json(launchpads);
    }

    catch  (error) {
        next(error);
    }

}

export const getLaunchpadById = async (req, res) => {
    try{

    const launchpad = await launchpadService.getLaunchpadById(req.params.id);

    
    if (!launchpad) {
        return res.status(404).json({ message: `Launchpad with id ${id} not found` });
    }

    return res.status(200).json(launchpad);
}
catch (error) {
    next(error);
    };
};


