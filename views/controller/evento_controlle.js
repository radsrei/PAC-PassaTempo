import { where } from "sequelize";
import { Evento } from "../models/evento_model.js";

const evento = {};

evento.getEvento = async (req, res) => {
    try {
          const eventos = await Evento.findAll();
          res.send(eventos);

    } catch (error) {
        console.error("Erro ao buscar evento:", error);
        res.status(500).json({message: 'Erro ao buscar evento'})  
    };
}

evento.createEvento = async (req, res) => {
    try {
         const { nome_evento, categoria_evento, local, data, inicio, descricao } = req.body;

          // Verificar se o nome do evento já existe
        const eventoExistente = await Evento.findOne({ where: { nome_evento } });
        if (eventoExistente) {
            return res.status(400).json({ message: "O nome do evento já está cadastrado, informe um novo nome." });
        }

         const novoEvento = await Evento.create({
            nome_evento, 
            categoria_evento, 
            local, 
            data, 
            inicio, 
            descricao
         })

         res.status(201).json(novoEvento);

    } catch (error) {
        console.error("Erro ao tentar adicionar um novo Evento", error);
        res.status(500).json({message: 'Erro ao criar Evento'})
    }
};

evento.updateEvento = async (req,res) => {
    try {
        const { id } = req.params;
        const { nome_evento, categoria_evento, local, data, inicio, descricao } = req.body;

        await Evento.update({
            nome_evento, 
            categoria_evento, 
            local, 
            data, 
            inicio, 
            descricao
        }, 
         { where: { id_evento: id }}  
    );

    const eventoAtualizado = await Evento.findByPk(id);
    res.status(200).json(eventoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({message: 'Erro ao atualizar evento'});
    }
};

evento.deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;

        const deletado = await Evento.destroy({
            where: { id_evento: id },
        });

        if (deletado){
            res.status(200).json({message: 'Evento deletado com sucesso'});
        } else {
            res.status(404).json({message: 'Evento não encontrado'});
        }

    } catch (error) {
        console.error("Erro ao tentar deletar o Evento:", error);
        res.status(500).json({message: "Erro ao tentar deletar o evento"});
    }
};

export { evento };