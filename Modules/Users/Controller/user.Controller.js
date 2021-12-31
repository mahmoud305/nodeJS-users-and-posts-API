const User = require("../Model/user.Model");

const getAllUsers=async (req,res)=>{
    console.log("hellooo");
    try {
        let users =await User.findAll();
        res.json({message:"success",data:users});
        
    } catch (error) {
        res.json({message:"failed",error});
    } 
}
 
function CheckUserExist(id){
    return new Promise ( async (x)=>{
        try {
            let userExist= await User.findAll({where:{id}});
            if(userExist.length){
                x(true);
            }
            else x(false);
        } catch (error) {
            x(false);
        }
    } )
}
const addUser = async (req,res)=>{
    console.log("user add");
    console.log(req.body);
    const {fName,lName,email , password}=req.body;
    try {
       await User.create({fName,lName,email , password});
        res.json({message:"success"});
    } catch (error) {
        res.json({message:"faild",error});
    }
}
async function editUser(req,res){
    const {id}=req.params;
    const {fName,email}= req.body;
    userExist= await CheckUserExist(id);
    if(userExist==false){
        res.json({message:"failed",error:`user with id :{${id}} does not exist `});
        return ;
    }
    try {
        await User.update({fName,email},{where:{id}});
        res.json({message:"success"});
    } catch (error) {
        res.json({message:"faild",error});
    }

};

const deleteUser= async (req,res)=>{
    const {id}=req.params;
    userExist= await CheckUserExist(id);
    if(userExist==false){
        res.json({message:"failed",error:`user with id :{${id}} does not exist `});
        return ;
    }
    try {
        await User.destroy({where:{id}});
        res.json({message:"success"});
    } catch (error) {
        res.json({message:"faild",error});
    }
}
module.exports={getAllUsers,addUser ,editUser ,deleteUser ,CheckUserExist}