import { Sequelize } from 'sequelize';

const url = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(url, {
  logging: false,
});

export default sequelize;