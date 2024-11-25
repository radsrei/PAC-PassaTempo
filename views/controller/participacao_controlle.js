import { where } from "sequelize";
import { Participacao } from "../models/participacao_model.js";


// Tem que ter um campo com os números de voluntários 
// Um campo de eventos
// Daí além do crud uma função para trazer os voluntários conforme o 
//filtro de período dos eventos. Tipo eventos dos 6 primeiros meses do anos 
//mostrar na tela em sequência os voluntários que mais participaram dos eventos
// Ali no começo só mostrar a quantidade total de evento e volu
const participacao = {};

participacao.getParticipacao = async (req, res) => {
    try {
          const participacoes = await participacao.findAll();
          res.send(participacoes);

    } catch (error) {
        console.error("Erro ao buscar participacao:", error);
        res.status(500).json({message: 'Erro ao buscar participacao'})  
    };
}

participacao.createParticipacao = async (req, res) => {
    try {
         const { id_partici, dt_cadastro, id_voluntario, id_evento } = req.body;
         const novoparticipacao = await participacao.create({
            id_partici, 
            dt_cadastro, 
            id_voluntario, 
            id_evento
         })

         res.status(201).json(novoparticipacao);

    } catch (error) {
        console.error("Erro ao tentar adicionar um novo participacao", error);
        res.status(500).json({message: 'Erro ao criar participacao'})
    }
};

participacao.updateParticipacao = async (req,res) => {
    try {
        const { id } = req.params;
        const { id_partici, dt_cadastro, id_voluntario, id_evento } = req.body;

        await participacao.update({
            id_partici, 
            dt_cadastro, 
            id_voluntario, 
            id_evento
        }, 
         { where: { id_participacao: id }}  
    );

    const participacaoAtualizado = await participacao.findByPk(id);
    res.status(200).json(participacaoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar participacao:", error);
        res.status(500).json({message: 'Erro ao atualizar participacao'});
    }
};

participacao.deleteParticipacao = async (req, res) => {
    try {
        const { id } = req.params;

        const deletado = await participacao.destroy({
            where: { id_partici: id },
        });

        if (deletado){
            res.status(200).json({message: 'participacao deletado com sucesso'});
        } else {
            res.status(404).json({message: 'participacao não encontrado'});
        }

    } catch (error) {
        console.error("Erro ao tentar deletar o participacao:", error);
        res.status(500).json({message: "Erro ao tentar deletar o participacao"});
    }
};

// Função para buscar um voluntário específico pelo ID
participacao.getVoluntarioById = async (req, res) => {
    const { id } = req.params; // Obtém o ID do voluntário a partir dos parâmetros da rota

    try {
        // Busca o voluntário pelo ID
        const participacaoEncontrado = await participacao.findByPk(id);

        if (participacaoEncontrado) {
            // Se o voluntário for encontrado, retorna os dados
            res.status(200).json(participacaoEncontrado);
        } else {
            // Caso o voluntário não seja encontrado, retorna um erro 404
            res.status(404).json({ message: "Voluntário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar voluntário por ID:", error);
        res.status(500).json({ message: "Erro ao buscar voluntário" });
    }
};


export { participacao };

// import { Op } from 'sequelize';
// import { Voluntario } from "../models/voluntario_model.js";
// import { Evento } from "../models/evento_model.js";
// import { Participacao } from "../models/participacao_model.js"; // Supondo que você tenha o modelo Participacao já definido

// const participanteController = {};

// // Função para filtrar eventos em um período dinâmico e mostrar os voluntários mais participativos
// participanteController.getVoluntariosPorPeriodo = async (req, res) => {
//     try {
//         // Extrair as datas de início e fim do período da query string da URL (pode ser ajustado para req.body)
//         const { inicio, fim } = req.query;

//         // Se as datas de início ou fim não forem fornecidas, retornar erro
//         if (!inicio || !fim) {
//             return res.status(400).json({ message: "As datas de início e fim são obrigatórias." });
//         }

//         // Converter as datas recebidas para objetos Date
//         const inicioPeriodo = new Date(inicio);
//         const fimPeriodo = new Date(fim);

//         // Verificar se as datas são válidas
//         if (isNaN(inicioPeriodo) || isNaN(fimPeriodo)) {
//             return res.status(400).json({ message: "Datas inválidas fornecidas." });
//         }

//         // Buscar eventos que ocorreram entre as datas fornecidas
//         const eventos = await Evento.findAll({
//             where: {
//                 dt_cadastro: {
//                     [Op.gte]: inicioPeriodo, // Data de início
//                     [Op.lte]: fimPeriodo,    // Data de fim
//                 },
//             },
//         });

//         // Se não houver eventos no período, retornar uma mensagem
//         if (eventos.length === 0) {
//             return res.status(404).json({ message: "Nenhum evento encontrado no período especificado." });
//         }

//         // Quantidade total de eventos no período
//         const quantidadeEventos = eventos.length;

//         // Buscar os voluntários que participaram desses eventos
//         const voluntarios = await Participacao.findAll({
//             attributes: [
//                 'id_voluntario',
//                 [sequelize.fn('COUNT', sequelize.col('id_voluntario')), 'quantidade_participacoes']
//             ],
//             where: {
//                 id_evento: {
//                     [Op.in]: eventos.map(evento => evento.id_evento), // Filtra por eventos do período
//                 },
//             },
//             group: ['id_voluntario'],
//             order: [[sequelize.fn('COUNT', sequelize.col('id_voluntario')), 'DESC']], // Ordena pela quantidade de participações
//         });

//         // Buscar detalhes dos voluntários mais participativos
//         const voluntariosDetalhados = await Promise.all(voluntarios.map(async (participacao) => {
//             const voluntario = await Voluntario.findByPk(participacao.id_voluntario);
//             return {
//                 voluntario: voluntario,
//                 quantidade_participacoes: participacao.dataValues.quantidade_participacoes,
//             };
//         }));

//         // Resposta contendo a quantidade de eventos, voluntários e os voluntários mais participativos
//         res.status(200).json({
//             quantidadeEventos: quantidadeEventos,
//             quantidadeVoluntarios: voluntariosDetalhados.length,
//             voluntariosMaisParticipativos: voluntariosDetalhados,
//         });
//     } catch (error) {
//         console.error("Erro ao buscar voluntários por período:", error);
//         res.status(500).json({ message: "Erro ao buscar voluntários e eventos." });
//     }
// };

// export { participanteController };