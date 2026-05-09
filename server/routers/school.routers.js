import express from 'express';
import { insertSchool, listSchools } from '../controllers/school.controllers.js';

const router = express.Router();

router.post('/add', insertSchool);
router.get('/list', listSchools);

export default router;