import express from 'express';
import { voluntario } from '../controller/voluntario_controlle.js';
 
const router = express.Router()

router.get('/voluntario', voluntario.getVoluntario)


 export {router};