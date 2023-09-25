const {updateUserById,deleteUserById,followUserById,followingUserById,getUserById,getFriendList} = require('../service/user');

const updateUser = async(req,res)=>{
    const id = req.params.id;
    const user = await updateUserById(id,req.body);

    if(!user.error){
        return res.status(user.status).json({
            message:"Success",
            data:user
        })
    }
    return res.status(user.status).json({
        message:user.message, 
    })
}

const deleteUser = async(req,res)=>{
    const id = req.params.id;
    const user = await deleteUserById(id,req.body);

    if(!user.error){
        return res.status(user.status).json({
            message:"Success",
            data:user
        })
    }
    return res.status(user.status).json({
        message:user.message, 
    })
}

const getUser = async(req,res)=>{
    const user = await getUserById(req.query);
    if(!user.error){
        return res.status(user.status).json({
            message:"Success",
            data:user
        })
    }
    return res.status(user.status).json({
        message:user.message, 
    })
}

const followUser = async(req,res)=>{
    const id = req.params.id;
    const follow = await followUserById(id,req.body.userId);
    if(!follow.error){
        return res.status(follow.status).json({
            message:"Success",
            data:follow
        })
    }
    return res.status(follow.status).json({
        message:follow.message, 
    })
}

const followingUser = async(req,res)=>{
    const id = req.params.id;
    const follow = await followingUserById(id,req.body.userId);
    if(!follow.error){
        return res.status(follow.status).json({
            message:"Success",
            data:follow
        })
    }
    return res.status(follow.status).json({
        message:follow.message, 
    })
}


const friendsList = async(req,res)=>{
  const id = req.params.userId;
  const friends = await getFriendList(id);
  if(!friends.error){
    return res.status(friends.status).json({
        message:"Success",
        data:friends
    })
}
return res.status(friends.status).json({
    message:friends.message, 
})

}
module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    followingUser,
    friendsList

}