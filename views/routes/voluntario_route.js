// import express from 'express';
// import { voluntario } from '../controller/voluntario_controlle.js';
 
// const router = express.Router()

// router.get('/voluntario', voluntario.getVoluntario);
// router.post('/voluntario', voluntario.createVoluntario);


//  export {router}; 

import express from 'express';
import { voluntario } from '../controller/voluntario_controlle.js';

const router = express.Router();

router.get('/voluntario', voluntario.getVoluntario);
router.post('/voluntario', voluntario.createVoluntario);
router.put('/voluntario/:id', voluntario.updateVoluntario);
router.delete('/voluntario/:id', voluntario.deleteVoluntario)


export { router };