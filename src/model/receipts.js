// this will include receipts table model => for the receipts table
const receipts = (sequelize, DataTypes) =>
  sequelize.define("receipts", {
    totalPrice: {
      type: DataTypes.STRING,
    },

    quantityNumber: {
      type: DataTypes.STRING,
    },

    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },

    // itemsSold: {
    //   type: DataTypes.ARRAY,
    // },
  });

module.exports = receipts;
