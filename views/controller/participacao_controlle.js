import { where } from "sequelize";
import { Participacao } from "../models/participacao_model.js";


// Tem que ter um campo com os números de voluntários 
// Um campo de eventos
// Daí além do crud uma função para trazer os voluntários conforme o filtro de período dos eventos. Tipo eventos dos 6 primeiros meses do anos mostrar na tela em sequência os voluntários que mais participaram dos eventos
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

export { participacao };