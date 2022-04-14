// this will include receipts table model => for the receipts table
const receipts = (sequelize, DataTypes) =>

  sequelize.define("receipts", {

    product: {
        type: DataTypes.ARRAY(DataTypes.JSON)
        }
    ,
    totalPrice: {
      type: DataTypes.FLOAT,
    },

    quantityNumber: {
      type: DataTypes.FLOAT,
    },

    userID: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    //cash or visa 
    PaymentMethod:{
      type: DataTypes.STRING,
    }
    
  });

module.exports = receipts;
