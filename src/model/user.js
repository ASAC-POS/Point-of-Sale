// this will include users table model => create a table for user

'use strict'

const user =(sequelize,DataTypes)=> sequelize.define('user',{

    //ID :{
      //  type: DataTypes.INTEGER,
      //    autoIncrement: true,
      //    primaryKey: true
    //},

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Please enter your name'
            }
          },

        unique: true //to throw an error in any attempt to insert an 
                      //username that already exists
      },

    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
        },

    role:{
        type: DataTypes.ENUM('admin', 'cashier', 'inventory'),
       defaultValue: 'admin',

    },

    storename :{
    type:DataTypes.STRING,
    },

    storeID:{
    type:DataTypes.INTEGER,
    allowNull:false 
     }

    
    
    })
    
    
    module.exports=user;