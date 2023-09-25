const {newPost, updatePost, deletePost, likeDislikePost,getPostById,getTimeLinePost,getuserPostByUsername}  = require('../service/post')

const addPost = async(req,res)=>{
    const post = await newPost(req.body);
    if(!post.error){ 
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}


const postUpdate = async(req,res)=>{
    const id = req.params.id
    const post = await updatePost(id,req.body);
    if(!post.error){
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}


const postDelete = async(req,res)=>{
    const id = req.params.id;
    const post = await deletePost(id,req.body);
    if(!post.error){
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}


const likeDislike = async(req,res)=>{
    const id = req.params.id
    const post = await likeDislikePost(id,req.body);
    if(!post.error){
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}

const getPost = async(req,res)=>{
    const id = req.params.id
    const post = await getPostById(id);
    if(!post.error){
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}

const timeLinePost = async(req,res)=>{
    console.log(req.params.id,typeof req.params.id )
    const post = await getTimeLinePost(req.params.id);
    
    if(!post.error){
        return res.status(post.status).json({
            message:"Success",
            data:post
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}


const getUserPost = async(req,res)=>{
    console.log(req.params.username)
    const post = await getuserPostByUsername(req.params.username);
    
    if(!post.error){
        return res.status(post.status).json({
            message:post.message,
           
        })
    }
    return res.status(post.status).json({
        message:post.message, 
    })
}
module.exports = {
    addPost,
   postUpdate,
   postDelete,
   likeDislike,
    getPost,
    timeLinePost,
    getUserPost

}