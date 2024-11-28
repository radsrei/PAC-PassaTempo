import { Sequelize } from 'sequelize';
import sequelize from "../config/banco.js";


const Home = sequelize.define('home', {

    id_home:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recado: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ordem:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
})

export {Home};