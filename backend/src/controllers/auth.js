const { getUser,addUser} = require('../service/auth')

const register = async(req,res)=>{
    const {username,email,password} = req.body;

    const user = await addUser(username,email,password);
    
    if(!user.error){
        return res.status(user.status).json({
            message:"Success",
            data:user
        })
    }

    return res.status(user.status).json({
        message:user.message
    })
}

const login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await getUser(email,password);
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

module.exports = {
    login,
    register
}