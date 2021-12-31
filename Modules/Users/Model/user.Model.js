const { DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../../../SQL.Config/SQLconfig");

const User = sequelizeInstance.define("user",{
    id: {   
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lName:{
        type:DataTypes.STRING,
        allowNull:false,    
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },

});

module.exports=User;