const products = (sequelize, DataTypes) =>
  sequelize.define("products", {
    productName: {
      type: DataTypes.STRING,
    },

    quantity: {
      type: DataTypes.INTEGER,
    },

    price: {
      type: DataTypes.INTEGER,
    },

    minQuantity: {
      type: DataTypes.INTEGER,
    },

    storeID: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  });

module.exports = products;
