import { createSchool, getAllSchools } from "../models/school.models.js";

// this calculation of of haversindistance is done by claude
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

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
};

export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: 'latitude and longitude are required' });
        }
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ success: false, message: 'latitude and longitude must be numbers' });
        }

        const userLat = Number(latitude);
        const userLon = Number(longitude);

        const schools = await getAllSchools();

        const sorted = schools
        .map((school) => ({
            ...school,
            distance_km: parseFloat(
            haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
            ),
        }))
        .sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json({
        success: true,
        count: sorted.length,
        data: sorted,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};