import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";


const Agenda = sequelize.define('agenda', {
    id_agenda:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome_eventoum:{
        type:Sequelize.STRING,
        allowNull: false

    },

    descricao_eventoum:{
        type:Sequelize.STRING,
        allowNull: false

    },

    nome_eventodois:{
        type:Sequelize.STRING,
        allowNull: false
    },

    descricao_eventodois:{
        type:Sequelize.STRING,
        allowNull: false
    },


    nome_eventotres:{
        type: Sequelize.STRING,
        allowNull: false
    },


    descricao_eventotres:{
        type: Sequelize.STRING,
        allowNull: false
    },


    nome_eventoquatro: {
        type: Sequelize.STRING,
        allowNull: false
    },

    
    descricao_eventoquatro: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

 export {Agenda};
