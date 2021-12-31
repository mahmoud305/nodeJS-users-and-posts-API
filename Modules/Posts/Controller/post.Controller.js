const { Op } = require("sequelize");
const { CheckUserExist } = require("../../Users/Controller/user.Controller");
const User = require("../../Users/Model/user.Model");
const Post = require("../Model/post.Model");

async function get_Posts(req, res) {
    try {
        let posts = await Post.findAll();
        res.json({ message: "success", data: posts });
    } catch (error) {
        res.json({ message: "failed" });
    }
}

const add_Post = async (req, res) => {
    const { title, content, userId } = req.body;
    let userExist = await CheckUserExist(userId);
    if (!userExist) {
        res.json({ message: "failed", error: `user with id:{${userId}} doesnot exist to add posts` });
        return;
    }
    try {
        await Post.create({ title, content, userId });
        res.json({ message: "success" });
    } catch (error) {
        res.json({ message: "failed" });
    }
}

function checkPostExist(post) {
    if (post.length > 0) {
        return (true);
    }
    console.log("user Doesnot Exist\n", error);
    return false;
}

/// check if the user Requsting the opertation is the authorized to this operation( user of the post is the only one who can edit it);
function checkUserValidaty(post, userID) {
    console.log(post);
    console.log("user ID \n", post.userId);
    if (post.userId == userID) {

        return true;
    }
    return false;
}
function checkPost(id, updated_userId) {
    return new Promise(async function (x) {
        try {
            let post = await Post.findAll({ where: { postID: id } });
            // console.log("post is \n",post[0]);
            if (checkPostExist(post)) {
                if (checkUserValidaty(post[0], updated_userId)) {// check why post doesnot 
                    x(true);
                    console.log("after return");
                }
                else console.log("user cannot update others user posts.");
            }
            else
                console.log("post doesnot exist to be updated");
        } catch (error) {
            console.log("user Doesnot Exist\n", error);
        }

        x(false);
    });
}
async function update_post(req, res) {
    let { post_id, user_id } = req.params;
    let { title, content } = req.body;
    is_update_Valid = await checkPost(post_id, user_id);
    if (is_update_Valid) {
        try {
            let result = await Post.update({ title, content }, { where: { postID: post_id } });
            console.log("result is \n", result);
            res.json({ message: "success" });
            //   await Post.update({ {title,content,userId} ,{where:{postID:post_ID}}});  
        } catch (error) {
            res.json({ message: "failed", error });
        }
    }
    else {
        res.json({ message: "faild", error: "error occured may the user doesnot Exist or the user dosenot has access to edit this post." })
    }
}


const delete_post = async (req, res) => {
    let { post_id, user_id } = req.params;
    is_delete_Valid = await checkPost(post_id, user_id);
    if (is_delete_Valid) {
        try {
            await Post.destroy({ where: { postID: post_id } });
            res.json({ message: "success" });
        } catch (error) {
            res.json({ message: "failed" });
        }
    }
    else
        res.json({ message: "faild", error: "error occured may the user doesnot Exist or the user dosenot has access to delete this post." })

}
const getPosts_With_UserInfo = async (req, res) => {
    // let { id } = req.params;
    // console.log(id);
    try {
        // why this where doesnot work well . I tried to get the post with specific ID  and its user info but it doesnot Work .
        // ----- solved ------
        let posts = await Post.findAll({
            //where:  { postID: id },
            include: [
                {
                    model: User,
                    attributes: ["fName", "email", "id"],
                    // where:{id}
                }
            ],
            attributes: ["title", "content"],

        });
        res.json({ message: "success", data: posts });
    } catch (error) {
        res.json({ message: "failed", error });
    }
};

async function querySolver(req, res) {
    let { id, query } = req.query;
    try {
        if (id) {
            let userExist = await CheckUserExist(id);
            if (!userExist) {
                res.json({ message: "failed", error: `user with id :{${id}} does not exist ` });
                return;
            }
            let userWithPosts = await Post.findAll({
                include: [{
                    model:User,
                    attributes:["fName","email" ],
                    where:{id}
                }]
            });
            res.json({message:"success",data:userWithPosts});
        }
      
        else if (query){
            let usersInfo = await Post.findAll({
                include:[
                    {
                        model:User,
                        attributes:["fName","lName","email","id"],
                        where:{[Op.or]:[
                            { fname:{ [Op.like]:`%${query}%` } },
                            { lName: { [Op.like]:`%${query}%` } }
                        ]}
                    }
                ],
                attributes: [],
            })
            res.json({message:"success",data:usersInfo});
        }
        else {
            getPosts_With_UserInfo(req,res);
            return ;
        }
        
    } catch (error) {
        res.json({ message: "failed", error });
    }
}


module.exports = { add_Post, get_Posts, update_post, delete_post, getPosts_With_UserInfo ,querySolver}