import express from "express";
import sequelize from "./views/config/banco.js";

// models
import { Voluntario } from "./views/models/voluntario_model.js";
// import { Participacao } from "./views/models/participacao_model.js";
// import { Login } from "./views/models/login_model.js";
// import { Home } from "./views/models/home_model.js";
// import { Evento } from "./views/models/evento_model.js";
// import { Agenda } from "./views/models/agenda_model.js";

// routers
import { router as voluntarioRouter } from "./views/routes/voluntario_route.js";

// conexão com o banco
const index = express();
index.use(express.json());
index.use(express.urlencoded({ extended: true }));

// usando o router
index.use(voluntarioRouter);

// apagar e salvar banco
// await sequelize.drop();
await sequelize.sync();

const PORT = process.env.PORT || 8080;
index.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
