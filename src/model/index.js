// this will initiate sequelize

//this file is for  preparing the connection between the server and  postgresql server .

const { Sequelize, DataTypes } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const users = require("./user");
const stores = require("./stores");
const receipts = require("./receipts");

const POSTGRES_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

// Relations

// Building the models
const userModel = users(sequelize, DataTypes);
const storesModel = stores(sequelize, DataTypes);
const receiptsModel = receipts(sequelize, DataTypes);

// Store one-to-many relation with the users

storesModel.hasMany(userModel, { foreignKey: "storeID", sourceKey: "id" });
userModel.belongsTo(storesModel, { foreignKey: "storeID", targetKey: "id" });

module.exports = {
  db: sequelize, //for connection ,we will use it the index.js
  Users: userModel,
  stores: storesModel,
  receipts: receiptsModel,
};
