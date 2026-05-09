import express from 'express';
import { insertSchool } from '../controllers/school.controllers.js';

const router = express.Router();

router.post('/add', insertSchool);

export default router;