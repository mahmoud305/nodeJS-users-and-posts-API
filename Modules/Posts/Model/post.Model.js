const { DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../../../SQL.Config/SQLconfig");
const User = require("../../Users/Model/user.Model");

const Post = sequelizeInstance.define('post',{
    postID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})

User.hasMany(Post,{onDelete:"CASCADE", onUpdate:"CASCADE"});
Post.belongsTo(User);
module.exports= Post;