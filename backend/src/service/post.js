const Post = require("../model/Post");
const User = require("../model/User");

exports.newPost = async(body)=>{
    const newPost = new Post(body);
    try {
      const savedPost = await newPost.save();
      return{
        message:savedPost,
        status:201
      }
    } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
    }
}


exports.updatePost = async(id,reqBody)=>{
    try {
        const post = await Post.findById(id);
        if (post.userId === reqBody.userId) {
          await post.updateOne({ $set: reqBody });
          return{
            message:"the post has been updated",
            status:200
          }
         
        } else {
            return{
                message:"you can update only your post",
                status:403
              }
        }
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
      }
}

exports.deletePost = async(id,reqBody)=>{
    try {
        const post = await Post.findById(id);
        if (post.userId === reqBody.userId) {
          await post.deleteOne();
          return{
            message:"the post has been deleted",
            status:200
          }
        } else {
            return{
                message:"you can delete only your post",
                status:403
              }
        }
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
      }
}

exports.likeDislikePost = async(id,reqBody)=>{
    try {
        const post = await Post.findById(id);
        if (!post.likes.includes(reqBody.userId)) {
          await post.updateOne({ $push: { likes: reqBody.userId } });
          return{
            message:"The post has been liked",
            status:200
          }
        
        } else {
          await post.updateOne({ $pull: { likes: reqBody.userId } });
          return{
            message:"The post has been disliked",
            status:200
          }
        }
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
      }
}

exports.getPostById = async(id)=>{
    try {
        const post = await Post.findById(id).sort({createdAt:-1});
        console.log(post)
        return{
            message:post,
            status:200
          }
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
      }
}

exports.getTimeLinePost = async(id)=>{
    try {
        const currentUser = await User.findById(id);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        return{
            message:userPosts.concat(...friendPosts),
            status:200
          }
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
        }
      }
}

exports.getuserPostByUsername = async(name)=>{
    try {
      const user = await User.findOne({username:name});
      console.log('user',username,user)
      const post = await Post.findOne({userId:user._id});
      if(!post){
        return {
          error:true,
          message:'Not found',
          status:404
        }
      }

      return {
        status:200,
        message:post
      }
    } catch (error) {
      return {
        error:true,
        status:500,
        message:error.stack
    }
    }
}