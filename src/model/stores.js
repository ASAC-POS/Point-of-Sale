// this will include stores table model => create a table for stores

const stores =(sequelize,DataTypes)=> sequelize.define('stores',{


    storename :{
            type:DataTypes.STRING,
            },
        

    location :{
        type:DataTypes.STRING,
        },

    productID :{
        type:DataTypes.STRING,
    }
    })
    
    
    module.exports=stores;