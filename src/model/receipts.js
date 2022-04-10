// this will include receipts table model => for the receipts table 
const receipts =(sequelize,DataTypes)=> sequelize.define('receipts',{



    totalnumber :{
        type:DataTypes.STRING,
    },

    quantitynumber :{
        type:DataTypes.STRING,
    },

    products :{
        type:DataTypes.STRING,
    }
    })
    
    
    module.exports=receipts;