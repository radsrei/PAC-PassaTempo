import Sequelize from 'sequelize';

const sequelize = new Sequelize('gestao_voluntarios', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: '5050',
    define: {
        timestamps: false,
      }
  });

export default sequelize;