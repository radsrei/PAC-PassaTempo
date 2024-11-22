import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";
import {Voluntario } from "../models/voluntario_model.js";
import { Evento } from "../models/evento_model.js";

const Participacao = sequelize.define('participacao', {

    id_partici: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
         dt_cadastro:{
         type: Sequelize.DATEONLY
     }
}) 

    Voluntario.belongsToMany(Evento,{
        through:{
            model:Participacao
        },
            foreignKey:'id_voluntario',
            constraint: true
        })
  
     Evento.belongsToMany(Voluntario,{
        through:{
            model: Participacao,
            //model: 'Participacao',
        },
            foreignKey:'id_evento',
            constraint: true
     })   

// (async () => {
//     await Voluntario.sync();
//     await Evento.sync();
//     await Participacao.sync();
// }) ();

export {Participacao};