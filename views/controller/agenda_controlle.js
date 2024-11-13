import { where } from "sequelize";
import { Agenda } from "../models/agenda_model.js";

const agenda = {};

agenda.getAgenda = async (req, res) => {
    try {
          const agendas = await Agenda.findAll();
          res.send(agendas);

    } catch (error) {
        console.error("Erro ao pesquisar agenda:", error);
        res.status(500).json({ message: 'Erro ao buscar essa agenda'})
        
    };
}

agenda.createAgenda = async(req,res) => {
    try {
            const { nome_eventoum, descricao_eventoum, nome_eventodois, descricao_eventodois, nome_eventotres, descricao_eventotres, nome_eventoquatro, descricao_eventoquatro} = req.body;
            const novaAgenda = await Agenda.create({
                nome_eventoum, 
                descricao_eventoum, 
                nome_eventodois, 
                descricao_eventodois, 
                nome_eventotres, 
                descricao_eventotres, 
                nome_eventoquatro, 
                descricao_eventoquatro
            })

                res.status(201).json(novaAgenda);

    } catch (error) {
        console.error("Erro ao tentar adicionar um novo Evento na Agenda", error);
        res.status(500).json({ message: 'Erro ao criar essa agenda'})
    }
};

agenda.updateAgenda = async (req, res) => {
    try {
            const { id } = req.params;
            const { nome_eventoum, descricao_eventoum, nome_eventodois, descricao_eventodois, nome_eventotres, descricao_eventotres, nome_eventoquatro, descricao_eventoquatro} = req.body;
            
            await Agenda.update(
                { nome_eventoum, 
                descricao_eventoum, 
                nome_eventodois, 
                descricao_eventodois,
                nome_eventotres, 
                descricao_eventotres, 
                nome_eventoquatro, 
                descricao_eventoquatro
                },
                { where: {id_agenda: id }}
            );

            const agendaAtualizada = await Agenda.findByPk(id);
            res.status(200).json(agendaAtualizada);

    } catch (error) {
        console.error("Erro ao atualizar agenda:", error);
        res.status(500).json({message: 'Erro ao atualizar agenda'})
    }
 };


 agenda.deleteAgenda = async (req, res) =>{
    try {
         const { id } = req.params;
         const deletado = await Agenda.destroy({
            where: {id_agenda: id},
         });


         if (deletado) {
            res.status(200).json({message: 'Agenda deletada com sucesso'});
         } else {
            res.status(404).json({message: 'Agenda não encontrada'});
         }  

    } catch (error) {
        console.error("Erro ao deletar a agenda:", error);
        res.status(500).json({message: 'Erro ao deletar a agenda'})
    }
 };


export { agenda }