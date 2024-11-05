// import db from './views/config/banco.js';
// config();


// import { Voluntario } from "./views/models/voluntario_model.js";


// const conn = "./views/config/banco.js";

// //conexao com o banco*//
// const { Sequelize } = require('sequelize');
// const express = require('express');
// const app = express();
// await db.sync();


// const con = new Sequelize('pac4_passatempo;', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql', 
// });

// // Testa a conexão com o banco de dados
// con.authenticate()
//   .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
//   .catch((erro) => console.error('Erro ao conectar com o banco de dados:', erro));

// // Sincroniza os modelos com o banco de dados e inicia o servidor
// con.sync()
//   //.sync({ force: true }) // Use com cautela em ambiente de desenvolvimento
//   .then(() => {
//     app.listen(8080, () => console.log('Servidor rodando na porta 8080.'));
//   })
//   .catch((erro) => console.error('Erro ao sincronizar com o banco de dados:', erro));

// import sequelize from "./views/config/banco.js"

import sequelize from "./views/config/banco.js";


//models
import { Voluntario } from "./views/models/voluntario_model.js";
import { Participacao } from "./views/models/participacao_model.js";
import { Login } from "./views/models/login_model.js";
import { Home } from "./views/models/home_model.js";
import { Evento } from "./views/models/evento_model.js";
import { Agenda } from "./views/models/agenda_model.js";


//routers
import { router } from "./views/routes/voluntario_route.js";



//apagar e salvar banco
await sequelize.drop();
await sequelize.sync()

import express from "express"

//conexao com o banco
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})