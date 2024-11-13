import express from "express";
import { agenda } from "../controller/agenda_controlle.js";

const router = express.Router();

router.get('/agenda', agenda.getAgenda);
router.post('/agenda', agenda.createAgenda);
router.put('/agenda/:id', agenda.updateAgenda);
router.delete('/agenda/:id', agenda.deleteAgenda);


export { router };