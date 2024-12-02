
import express from 'express';
import { participacao } from '../controller/participacao_controlle.js';

const router = express.Router();

router.get('/participacao/buscar', participacao.getParticipacao);
router.post('/participacao/criar', participacao.createParticipacao);
router.patch('/participacao/editar/:id', participacao.updateParticipacao);
router.delete('/participacao/deletar/:id', participacao.deleteParticipacao);
router.get('/participacao/buscar/voluntario/:id', participacao.getVoluntarioEvento);


export { router };
