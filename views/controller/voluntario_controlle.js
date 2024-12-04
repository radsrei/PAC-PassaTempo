import { where } from "sequelize";
import { Voluntario } from "../models/voluntario_model.js";
import { Evento } from "../models/evento_model.js";
import sequelize from "../config/banco.js";

const voluntario = {};

voluntario.verificarVoluntario = async (req, res) => {
    const { cpf, email } = req.body;
  
    // Validações de CPF e E-mail
    if (!cpf) {
      return res.status(422).json({ message: "O CPF é obrigatório" });
    }
    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }
  
    try {
      // Verificar se o voluntário com o CPF e e-mail fornecidos existe no banco de dados
      const voluntarioExistente = await Voluntario.findOne({
        where: {
          cpf: cpf,
          email: email,
        },
      });
  
      // Caso o voluntário exista, retorna a mensagem de confirmação
      if (voluntarioExistente) {
        return res.status(200).json({ message: "Voluntario encontrado, deseja participar deste evento?" });
      } else {
        // Caso não exista, solicita que informe o evento desejado
        return res.status(404).json({ message: "Informe o evento que deseja participar" });
      }
    } catch (error) {
      console.error("Erro ao verificar o voluntário:", error);
      res.status(500).json({ message: 'Erro ao verificar o voluntário' });
    }
};

// Nova função para buscar os 10 voluntários mais ativos
// Endpoint para buscar voluntários com filtros pela URL
voluntario.getTopVoluntarios = async (req, res) => {
  const { data, voluntario } = req.params; // Filtros na URL

  try {
    let query = `
      SELECT V.nome, V.cpf, COUNT(P.id_voluntario) AS qt_participacoes
      FROM participacaos P
      INNER JOIN voluntarios V ON V.id_voluntario = P.id_voluntario
      INNER JOIN eventos E ON E.id_evento = P.id_evento
    `;

    const filters = [];
    if (data && data !== 'null') {
      filters.push(`DATE_FORMAT(E.data, '%m-%Y') = '${data}'`);
    }
    if (voluntario && voluntario !== 'null') {
      filters.push(`V.nome = '${voluntario}'`);
    }

    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    query += `
      GROUP BY V.nome, V.cpf
      ORDER BY qt_participacoes DESC
      LIMIT 10
    `;

    const [results] = await sequelize.query(query);
    res.status(200).json(results); // Retorna os resultados como JSON
  } catch (error) {
    console.error("Erro ao buscar os voluntários:", error);
    res.status(500).json({ message: "Erro ao buscar voluntários", details: error.message });
  }
};

voluntario.getVoluntariosDisponiveis = async (req, res) => {
  try {
    const [voluntarios] = await sequelize.query(
      `SELECT DISTINCT nome FROM voluntarios v ORDER BY nome`
    );
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error('Erro ao buscar voluntários:', error);
    res.status(500).json({ message: 'Erro ao buscar voluntários' });
  }
};

voluntario.getTotalVoluntarios = async (req, res) =>{
  try {
      const [voluntarios] = await sequelize.query(
          `select count(*) as count from voluntarios e `
      );
      res.status(200).json(voluntarios);
  } catch (error) {
      console.error('Erro ao buscar total voluntarios: ', error);
      res.status(500).json({message: 'Erro ao buscar voluntarios'});
  }
}

// GET - Busca todos os voluntários
voluntario.getVoluntario = async (req, res) => {
    try {
        const voluntarios = await Voluntario.findAll(); // Usa o model Voluntario para buscar todos os registros
        res.send(voluntarios);
    } catch (error) {
        console.error("Erro ao buscar voluntários:", error);
        res.status(500).json({ message: 'Erro ao buscar voluntários' })
  };
}

// POST - Cria um novo voluntário
voluntario.createVoluntario = async (req, res) => {
    try {
        // Alinha os nomes dos campos com o modelo
        let { nome, email, cpf, evento } = req.body;

        //converter nome para caixa alta
        nome = nome.toUpperCase();

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

// Função para atualizar um voluntário
voluntario.updateVoluntario = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do voluntário a partir dos parâmetros da rota
        const { nome, email, cpf, evento } = req.body; // Alinhe os campos com o model

        await Voluntario.update(
            {
                nome,
                email,
                cpf,
                evento,
            },
            { where: { id_voluntario: id } } // Use o campo id_voluntario para correspondência
        );

        const voluntarioAtualizado = await Voluntario.findByPk(id);
        res.status(200).json(voluntarioAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar voluntário:", error);
        res.status(500).json({ message: 'Erro ao atualizar voluntário' });
    }
};

// Função para deletar um voluntário
voluntario.deleteVoluntario = async (req, res) => {
    try {
        const { id } = req.params;

        const deletado = await Voluntario.destroy({
            where: { id_voluntario: id },
        });

        if (deletado) {
            res.status(200).json({ message: "Voluntário deletado com sucesso" });
        } else {
            res.status(404).json({ message: "Voluntário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao tentar deletar o voluntário:", error);
        res.status(500).json({ message: "Erro ao tentar deletar o voluntário" });
    }
};


export { voluntario };