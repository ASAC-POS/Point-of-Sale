 // this will initiate sequelize

//this file is for  preparing the connection between the server and  postgresql server .

const{Sequelize,DataTypes}=require('sequelize');

const dotenv = require("dotenv");
dotenv.config();

const users=require('./user');
const stores =require('./stores');
const receipts =require('./receipts');




const POSTGRES_URL  = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL; 

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(POSTGRES_URL , sequelizeOptions);






module.exports={
    db :sequelize, //for connection ,we will use it the index.js 
    users: users(sequelize,DataTypes),
    stores : stores(sequelize,DataTypes),
    receipts:receipts(sequelize,DataTypes)
}