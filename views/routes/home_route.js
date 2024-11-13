
import express from 'express';
import { home } from '../controller/home_controller.js';

const router = express.Router();

router.get('/home', home.getHome);
router.put('/home/:id', home.updatehome);
router.delete('/home/:id', home.deleteHome);

export { router };
