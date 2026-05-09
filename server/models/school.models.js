import pool from '../db/db.js';

export const createSchool = async (name, address, lati, longi) => {
    const [result] = await pool.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, lati, longi]
    );
    return result;
};

export const getAllSchools = async () => {
    const [rows] = await pool.execute(
        'SELECT * FROM schools'
    );
    return rows;
};