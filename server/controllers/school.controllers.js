import { createSchool } from "../models/school.models.js";

export const insertSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if(!name || !address || latitude == undefined || longitude == undefined)
        {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (typeof name !== 'string' || name.trim() === '') 
        {
            return res.status(400).json({ success: false, message: 'Name must be a non-empty string' });
        }

        if(isNaN(latitude) || isNaN(longitude)){
            return res.status(400).json({ success: false, message: 'Latitude & Longitude must be a Number'});
        }

        const result = await createSchool(name, address, latitude, longitude);

        res.status(201).json({ 
            success: true, 
            message: 'School added successfully', 
            schoolId: result.insertId });;

    } 
    catch (err) {
      return res.status(500).json({
        message: err.message,
        info: err.code
      });
    }
}