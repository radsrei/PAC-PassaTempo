
import express from 'express';
import { evento } from '../controller/evento_controlle.js';

const router = express.Router();

router.get('/evento', evento.getEvento);
router.post('/evento', evento.createEvento);
router.put('/evento/:id', evento.updateEvento);
router.delete('/evento/:id', evento.deleteEvento);
router.get('/evento/data', evento.getDatasDisponiveis);
router.get('/evento/total', evento.getTotalEventos);



export { router };
