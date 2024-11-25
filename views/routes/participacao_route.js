
import express from 'express';
import { participacao } from '../controller/participacao_controlle.js';

const router = express.Router();

router.get('/participacao', participacao.getParticipacao);
router.post('/participacao', participacao.createParticipacao);
router.put('/participacao/:id', participacao.updateParticipacao);
router.delete('/participacao/:id', participacao.deleteParticipacao);
router.get('/participacao/:id', participacao.getVoluntarioByIdComEventos);


export { router };
