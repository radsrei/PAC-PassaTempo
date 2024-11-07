// import { where } from "sequelize";
// import { Voluntario } from "../models/voluntario_model.js";

// const voluntario = {};

// // GET
// //esse volntario estou criando um objeto aqui agora. 
// voluntario.getVoluntario = async (req, res) => {
//     try {
//         //esse 'voluntarios' com s no fim não existe.   
//         const voluntarios = await Voluntario.findAll(); //esse voluntario com "V" maiusculo é da classe model. 
//         res.send(voluntarios);
//     } catch (error) {
//         console.error("Erro ao buscar voluntários:", error); // Corrigido consle para console
//         res.status(500).json({ message: 'Erro ao buscar voluntários' });
//     }
// };

// // Função para criar um novo voluntário
// voluntario.createVoluntario = async (req, res) => {
//     try {
//       const { nome_voluntario, email_voluntario, cpf_voluntario, evento_voluntario } = req.body;
  
//       const novoVoluntario = await Voluntario.create({
//         nome_voluntario,
//         email: email_voluntario,
//         cpf: cpf_voluntario,
//         evento_voluntario,
//       });
  
//       res.status(201).json(novoVoluntario);
//     } catch (error) {
//       console.error("Erro ao tentar adicionar um novo voluntário:", error);
      
//     }
//   };

// export { voluntario };

import { where } from "sequelize";
import { Voluntario } from "../models/voluntario_model.js";

const voluntario = {};

// GET - Busca todos os voluntários
voluntario.getVoluntario = async (req, res) => {
    try {
        const voluntarios = await Voluntario.findAll(); // Usa o model Voluntario para buscar todos os registros
        res.send(voluntarios);
    } catch (error) {
        console.error("Erro ao buscar voluntários:", error);
        res.status(500).json({ message: 'Erro ao buscar voluntários' });
    }
};

// POST - Cria um novo voluntário
voluntario.createVoluntario = async (req, res) => {
    try {
        // Alinha os nomes dos campos com o modelo
        const { nome, email, cpf, evento } = req.body;

        const novoVoluntario = await Voluntario.create({
            nome,
            email,
            cpf,
            evento,
        });

        res.status(201).json(novoVoluntario);
    } catch (error) {
        console.error("Erro ao tentar adicionar um novo voluntário:", error);
        res.status(500).json({ message: 'Erro ao criar voluntário' });
    }
};

export { voluntario };