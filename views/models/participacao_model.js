import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";

const Participacao = sequelize.define('participacao', {

    id_partici: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    
    id_voluntario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'voluntario',
            key: 'id_voluntario'
        },

        onUpdate: 'CASCADE',  
        onDelete: 'CASCADE'
    },

    id_evento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'eventos',   
            key: 'id_evento'    
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

    }   
})

export {Participacao};