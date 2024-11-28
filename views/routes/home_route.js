import express from 'express';
import {MensagemDescri, MensagemCurta, getHome, updateHome, deleteHome} from '../controller/home_controller.js'

const router = express.Router();

router.post('/home/criar/descri', MensagemDescri);
router.post('/home/criar/curta', MensagemCurta);
router.get('/home/buscar', getHome);
router.patch('/home/editar/:id', updateHome);
router.delete('/home/deletar/:id', deleteHome);

export { router };