



const conn = "./views/config/banco.js";

//conexao com o banco*//
const { Sequelize } = require('sequelize');

const con = new Sequelize('gestao_voluntarios', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou 'postgres', 'sqlite', 'mariadb', 'mssql', dependendo do banco de dados
});

// Testa a conexão com o banco de dados
con.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch((err) => console.error('Erro ao conectar com o banco de dados:', err));

// Sincroniza os modelos com o banco de dados e inicia o servidor
con.sync()
  //.sync({ force: true }) // Use com cautela em ambiente de desenvolvimento
  .then(() => {
    app.listen(5050, () => console.log('Servidor rodando na porta 8080.'));
  })
  .catch((err) => console.error('Erro ao sincronizar com o banco de dados:', err));
