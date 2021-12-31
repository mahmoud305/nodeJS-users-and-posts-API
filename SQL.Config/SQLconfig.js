const { Sequelize } = require("sequelize");
const sequelizeInstance = new Sequelize ('facebook','root','123456',{host:"localhost" , dialect:"mysql"});

createTables= function (){
    sequelizeInstance.sync().then( (result)=>{console.log("result");} ).catch( (err)=>{console.log(err);} );
}

module.exports={sequelizeInstance,createTables};