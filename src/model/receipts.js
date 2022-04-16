// this will include receipts table model => for the receipts table
const receipts = (sequelize, DataTypes) =>

  sequelize.define("receipts", {

    product: {
        type: DataTypes.ARRAY(DataTypes.JSON)
        }
    ,

    userID: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    storeID: {
      type: DataTypes.INTEGER,
    },
    //cash or visa 
    PaymentMethod:{
      type: DataTypes.STRING,
    },

    total: {
      type: DataTypes.FLOAT,
    },
    discount :{
      type: DataTypes.FLOAT,
    },
    totalAfterDiscount :{
      type:DataTypes.FLOAT,
    }
  });

module.exports = receipts;
