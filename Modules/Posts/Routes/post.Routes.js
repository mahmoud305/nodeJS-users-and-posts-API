const postRouter= require("express").Router();
const { add_Post, get_Posts, update_post, delete_post, getPosts_With_UserInfo, querySolver } = require("../Controller/post.Controller");


postRouter.post("/addPost",add_Post);
postRouter.get("/getAllPosts",get_Posts);
postRouter.put("/updatePost/:user_id/:post_id",update_post);
postRouter.delete("/deletePost/:user_id/:post_id",delete_post);
postRouter.get("/getPostInfo",getPosts_With_UserInfo);
postRouter.get("/getUsersWithQuery",querySolver);
module.exports=postRouter;


// Check why getPostInfo doesnot work with ID