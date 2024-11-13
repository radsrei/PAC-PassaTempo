import { where } from "sequelize";
import { Home } from "../models/home_model.js";


//Funcionalidades da Tela Home
//Puxar recado
//Salvar recado
//Deletar recado


const home = {};

home.getHome = async (req, res) => {
    try {
          const recado = await Home.findAll();
          res.send(recado);

    } catch (error) {
        console.error("Erro ao buscar home:", error);
        res.status(500).json({message: 'Erro ao buscar home'})  
    };
}

home.updateHome = async (req,res) => {
    try {
        const { id } = req.params;
        const { recado, tipo, ordem} = req.body;

        await Home.update({
            recado, 
            tipo,
            ordem
        }, 
         { where: { id_home: id }}  
    );

    const homeAtualizado = await Home.findByPk(id);
    res.status(200).json(homeAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar home:", error);
        res.status(500).json({message: 'Erro ao atualizar home'});
    }
};

home.deleteHome = async (req, res) => {
    try {
        const { id } = req.params;

        const apagado = await Home.destroy({
            where: { id_home: id },
        });

        if (apagado){
            res.status(200).json({message: 'Home apagada com sucesso'});
        } else {
            res.status(404).json({message: 'Home não encontrado'});
        }

    } catch (error) {
        console.error("Erro ao tentar deletar o Home:", error);
        res.status(500).json({message: "Erro ao tentar deletar o home"});
    }
};

export { home };