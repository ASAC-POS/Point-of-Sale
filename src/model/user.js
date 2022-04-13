// this will include users table model => create a table for user

"use strict";

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET || "LEEN";

const user = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name",
        },
      },

      unique: true,
      //to throw an error in any attempt to insert an
      //username that already exists
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "cashier", "inventory"),
      defaultValue: "cashier",
    },

    /*
    actions:
      - read : can request data from the database [all users]
      - update : can edit data from the database [all users]
      - add : can add data to product and receipts tables [all users]
      - remove : can remove a profuct from product's tables [admin, inventory]
      - create : can create new users for a store id [admin]
      - delete : can remove a receipt or a user from their tables [admin]
      - edit : can edit user's information (password, username) [admin]
    */
    
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          cashier: ["read", "update","add"],
          inventory: ["read", "add", "update","remove"],
          admin: ["read", "create", "update", "delete", "add","remove","edit"],
        };
        return acl[this.role];
      },
    },
    // \\storename: {
    //   type: DataTypes.STRING,
    // },
    token: {
      type: DataTypes.VIRTUAL,
    },
    storeID: {
     type: DataTypes.INTEGER,
      //allowNull: false,
   },
  });

  //basic function
  Users.authenticate = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username: username } });

      const isValid = await bycrypt.compare(password, user.password);

      if (isValid) {
        let token = jwt.sign(
          {
            // exp: Math.floor(Data.now() / 1000) + 1200, //token expiary might not be needed, as the chashier will be working on shift.
            id: user.id,
          },
          SECRET
        );
        user.token = token;
        return user;
      } else {
        throw new Error("token in invalid : please sign in again");
      }
    } catch (e) {
      throw new Error(`??? error : ${e}`);
    }
  };

  //bearer
  Users.verifyBearerToken = async function (token) {
    let validUser = jwt.verify(token, SECRET);
    try {
      let user = await Users.findOne({ where: { id: validUser.id } });
      return user;
    } catch (e) {
      throw new Error(`error varifying the token: ${e}`);
    }
  };
  return Users;
};

module.exports = user;
