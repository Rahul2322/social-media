
const User = require("../model/User");
const bcrypt = require("bcrypt");
exports.updateUserById = async(id,rawBody)=>{
    if (rawBody.userId === id || rawBody.isAdmin) {
        if (rawBody.password) {
          try {
            const salt = await bcrypt.genSalt(10);
            rawBody.password = await bcrypt.hash(rawBody.password, salt);
          } catch (err) {
            return {
                error:true,
                status:500,
                message:err.stack
            }
          }
        }
        try {
          const user = await User.findByIdAndUpdate(id, {
            $set: rawBody,
          });
          return {
            error:true,
            status:500,
            message:"You can update only your account!"
          }
        } catch (err) {
          return {
            error:true,
            status:500,
            message:err.stack
          }
        }
      } else {
        return {
            error:true,
            status:500,
            message:"You can update only your account!"
        }
      }
}

exports.deleteUserById = async(id,rawBody)=>{
    if (rawBody.userId === id || rawBody.isAdmin) {
        try {
          await User.findByIdAndDelete(id);
          return {
            status:200,
            message:"Account has been deleted"
          }
        } catch (err) {
          return {
            error:true,
            status:500,
            message:err.stack
          }
        }
      } else {
        return {
            status:200,
            message:"You can delete only your account!"
          }
      }
}

exports.getUserById = async(reqQuery)=>{
  const userId = reqQuery.userId;
  const username = reqQuery.username;
    try {
        const user = userId ?  await User.findById(userId).sort({createdAt:-1}) : await User.findOne({username}).sort({createdAt:-1});
        const { password, updatedAt, ...other } = user._doc;
        return {
            status:200,
            message:other
        }
        
      } catch (err) {
        return {
            error:true,
            status:500,
            message:err.stack
          }
      }
}

exports.followUserById = async(id,userId)=>{
    if (userId !== id) {
        try {
          const user = await User.findById(id);
          const currentUser = await User.findById(userId);
          if (!user.followers.includes(userId)) {
            await user.updateOne({ $push: { followers: userId } });
            await currentUser.updateOne({ $push: { followings: id } });
            return {
                status:200,
                message:"User has been followed"
            }
           
          } else {
            return {
                error:true,
                status:200,
                message:"You allready follow this user"
            }
          }
        } catch (err) {
            return {
                error:true,
                status:500,
                message:err.stack
              }
        }
      } else {
        return {
            error:true,
            status:403,
            message:"You cant follow yourself"
          }
      }
}

exports.followingUserById = async(id,userId)=>{
    if (userId !== id) {
        try {
          const user = await User.findById(id);
          const currentUser = await User.findById(userId);
          if (user.followers.includes(userId)) {
            await user.updateOne({ $pull: { followers: userId } });
            await currentUser.updateOne({ $pull: { followings: id } });
            return {
                status:200,
                message:"user has been unfollowed"
            }
          } else {
            return {
                error:true,
                status:200,
                message:"you dont follow this user"
            }
          }
        } catch (err) {
            return {
                error:true,
                status:500,
                message:err.stack
              }
        }
      } else {
        return {
            error:true,
            status:403,
            message:"you cant unfollow yourself"
        }
      }
}


exports.getFriendList = async(id)=>{
   try {
    const user = await User.findById(id);
    const friendList = [];
    const friends = await Promise.all(
      user.followings.map(friendId=>{
          return User.findById(friendId)
      })
    );

    friends.map(friend=>{
      const {username,_id,profilePicture} = friend;
      friendList.push({username,_id,profilePicture} )
    });

    return{
      status:200,
      message:friendList
    }
   } catch (error) {
    return{
      status:500,
      error:true,
      message:error.stack
    }
   }
}
