// this will include stores table model => create a table for stores

const stores =(sequelize,DataTypes)=> sequelize.define('stores',{


        storename :{
            type:DataTypes.STRING,
            },
        

    location :{
        type:DataTypes.STRING,
        },

    //we should have the products as an array of objects
    products :{
        type:DataTypes.STRING,
    }
    })
    
    
    module.exports=stores;