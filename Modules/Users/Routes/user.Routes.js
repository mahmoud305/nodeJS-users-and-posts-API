const { getAllUsers, addUser, editUser,deleteUser } = require("../Controller/user.Controller");

const userRouter = require("express").Router();


userRouter.get("/getAllUsers",getAllUsers);
userRouter.post("/addUser",addUser);
userRouter.put("/updateUser/:id",editUser);
userRouter.delete("/deleteUser/:id",deleteUser);
module.exports =userRouter;