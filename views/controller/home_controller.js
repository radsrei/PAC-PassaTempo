import { Home } from "../models/home_model.js";

const MensagemDescri = async (req, res) => {
    try {
        const { recado } = req.body;
        console.log(recado)
        const MensagemCurta = await Home.create({
            recado, 
            tipo: 1
        })

        res.status(201).json(MensagemCurta);

   } catch (error) {
       console.error("Erro ao tentar adicionar um novo Descrição", error);
       res.status(500).json({message: 'Erro ao criar Descrição'})
   }
}

const MensagemCurta = async (req, res) => {
    try {
        const { recado, ordem } = req.body;
        const MensagemCurta = await Home.create({
            recado, 
            tipo: 2, 
            ordem
        })

        res.status(201).json(MensagemCurta);

   } catch (error) {
       console.error("Erro ao tentar adicionar uma nova mensagem curta", error);
       res.status(500).json({message: 'Erro ao criar mensagem curta'})
   }
}

const getHome = async (req, res) => {
    try {
          const recado = await Home.findAll();
          res.send(recado);

    } catch (error) {
        console.error("Erro ao buscar home:", error);
        res.status(500).json({message: 'Erro ao buscar home'})  
    };
}

const updateHome = async (req, res) => {
    try {
        const { id } = req.params;
        const { recado, tipo, ordem } = req.body;

        console.log('ID recebido:', id);
        console.log('Dados recebidos no body:', req.body);

        await Home.update(
            { recado, tipo, ordem },
            { where: { id_home: id } }
        );

        const homeAtualizado = await Home.findByPk(id);

        if (!homeAtualizado) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        res.status(200).json(homeAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar home:', error);
        res.status(500).json({ message: 'Erro ao atualizar home' });
    }
};

const deleteHome = async (req, res) => {
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

export { MensagemDescri, MensagemCurta, getHome, updateHome, deleteHome };