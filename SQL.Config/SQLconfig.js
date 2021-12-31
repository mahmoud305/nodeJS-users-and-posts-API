const { Sequelize } = require("sequelize");
/****DataBase Configuration
*DataBaseName: facebook
*username: root
*password: 123456
*/
const sequelizeInstance = new Sequelize ('facebook','root','123456',{host:"localhost" , dialect:"mysql"});

createTables= function (){
    sequelizeInstance.sync().then( (result)=>{console.log("result");} ).catch( (err)=>{console.log(err);} );
}

module.exports={sequelizeInstance,createTables};
