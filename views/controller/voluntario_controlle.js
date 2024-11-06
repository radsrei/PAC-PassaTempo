// import { where } from "sequelize";
// import { Voluntario } from "../models/voluntario_model.js";

// const voluntarioscon = {};

// //GET
// voluntarioscon.getVoluntario = async(req,res) => {
//     try {
        
//         const voluntarios = await Voluntario.findAll()
//         res.send(voluntarios) 

//     } catch (error) {
//         consle.error(error);
//         res.status(500).json({ message: 'Erro ao buscar voluntários' });
//     }
// }

// export { voluntarioscon };


import { where } from "sequelize";
import { Voluntario } from "../models/voluntario_model.js";

const voluntario = {};

// GET
//esse volntario estou criando um objeto aqui agora. 
voluntario.getVoluntario = async (req, res) => {
    try {
        //esse 'voluntarios' com s no fim não existe.   
        const voluntarios = await Voluntario.findAll(); //esse voluntario com "V" maiusculo é da classe model. 
        res.send(voluntarios);
    } catch (error) {
        console.error("Erro ao buscar voluntários:", error); // Corrigido consle para console
        res.status(500).json({ message: 'Erro ao buscar voluntários' });
    }
};

export { voluntario };