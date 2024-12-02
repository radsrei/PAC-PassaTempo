import { Participacao } from "../models/participacao_model.js";  // Corrigido para o modelo correto
import { where } from "sequelize";  // Para usar operadores do Sequelize (se necessário)

const participacao = {};

participacao.getParticipacao = async (req, res) => {
    try {
        const participacoes = await Participacao.findAll(); // Usando o modelo correto
        res.send(participacoes);
    } catch (error) {
        console.error("Erro ao buscar participacao:", error);
        res.status(500).json({ message: 'Erro ao buscar participacao' });
    }
};

participacao.createParticipacao = async (req, res) => {
    try {
        const { id_partici, dt_cadastro, id_voluntario, id_evento } = req.body;
        const novoparticipacao = await Participacao.create({
            id_partici, 
            dt_cadastro, 
            id_voluntario, 
            id_evento
        });
        res.status(201).json(novoparticipacao);
    } catch (error) {
        console.error("Erro ao tentar adicionar um novo participacao", error);
        res.status(500).json({ message: 'Erro ao criar participacao' });
    }
};

participacao.updateParticipacao = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_partici, dt_cadastro, id_voluntario, id_evento } = req.body;

        await Participacao.update({
            id_partici, 
            dt_cadastro, 
            id_voluntario, 
            id_evento
        }, 
        { where: { id_partici: id }});  // Corrigido o nome da coluna para 'id_partici'

        const participacaoAtualizado = await Participacao.findByPk(id);
        res.status(200).json(participacaoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar participacao:", error);
        res.status(500).json({ message: 'Erro ao atualizar participacao' });
    }
};

participacao.deleteParticipacao = async (req, res) => {
    try {
        const { id } = req.params;

        const deletado = await Participacao.destroy({
            where: { id_partici: id },  // Corrigido para 'id_partici'
        });

        if (deletado) {
            res.status(200).json({ message: 'Participacao deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Participacao não encontrado' });
        }
    } catch (error) {
        console.error("Erro ao tentar deletar o participacao:", error);
        res.status(500).json({ message: "Erro ao tentar deletar o participacao" });
    }
};

participacao.getVoluntarioEvento = async (req, res) => {
    const { data } = req.query;
    console.log(data);

    try {
        let sql_data = "";
        if (data != null) {
            sql_data = `AND e."dt_evento" LIKE '%${data}%'`;  // Corrigido o uso de SQL dinâmico
        }    

        const participacao = await db.query(`
            SELECT v."id_voluntario", v."nome", COUNT(p."id_evento") AS quantidade_eventos
            FROM Voluntario v
            JOIN Participacao p ON v."id_voluntario" = p."id_voluntario"
            JOIN Evento e ON p."id_evento" = e."id_evento"
            WHERE 1 = 1
            ${sql_data}
            GROUP BY v."id_voluntario"
            ORDER BY quantidade_eventos DESC;
        `, { type: db.QueryTypes.SELECT });

        const dadosFormatados = participacao.map((voluntario) => ({
            id: voluntario.id_voluntario,
            Nome: voluntario.nome,
            QuantidadeEventos: voluntario.quantidade_eventos,
        }));

        res.status(200).json({ voluntarios: dadosFormatados });
    } catch (error) {
        console.error("Erro ao buscar os voluntários:", error);
        res.status(500).json({
            message: "Erro ao buscar os voluntários.",
            erro: error.message,
        });
    }
};

export { participacao };
