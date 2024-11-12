import express from 'express';
import { createUser, login } from '../controller/login_controller.js';  // Corrigido para importar a função diretamente

const router = express.Router();

router.post('/criar/usuario', createUser);
router.post('/login', login);

export { router };
