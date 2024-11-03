import { Voluntario } from "../models/voluntario_model.js";

const voluntario = {};

//GET
voluntario.getVoluntario = async(req,res) => {
    try {
        
        const voluntario = await Voluntario.findAll()
        res.send(voluntario) //envinhar infomação


    } catch (error) {
        console.log(error)
    }
}
