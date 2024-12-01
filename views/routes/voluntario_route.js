import express from "express"
import { voluntario } from '../controller/voluntario_controlle.js';

const router = express.Router();

router.get('/voluntario', voluntario.getVoluntario);
router.post('/voluntario', voluntario.createVoluntario);
router.put('/voluntario/:id', voluntario.updateVoluntario);
router.delete('/voluntario/:id', voluntario.deleteVoluntario);
router.get('/voluntario/top', voluntario.getTopVoluntarios);
router.get('/voluntario/nome', voluntario.getVoluntariosDisponiveis);
router.get('/voluntario/total', voluntario.getTotalVoluntarios);


export { router };