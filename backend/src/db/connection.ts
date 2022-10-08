import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  database: "booking_schema",
  username: "root",
  password: "admin",
  logging: false,
});

export default db;
