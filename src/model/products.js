const products = (sequelize, DataTypes) =>
  sequelize.define("products", {
    
    productName: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.FLOAT,
    },
    
    description:{
      type: DataTypes.TEXT,

    },

    price: {
      type: DataTypes.FLOAT,
    },

    minQuantity: {
      type: DataTypes.FLOAT,
    },

    storeID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  });

module.exports = products;
