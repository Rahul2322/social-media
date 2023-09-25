
const bcrypt = require('bcrypt');
const User = require("../model/User")


exports.addUser = async (name, email, pass) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(pass, salt);

        const isUserExist = await User.findOne({
            email: email
        });

        if (isUserExist) {
            return {
                error: true,
                message: "User Already Exist",
                status:400
            }
        }

        const user = await User.create({
            username: name,
            email,
            password: hashPassword
        })

        return{
            status:200,
            message:user
        }
    } catch (err) {
        return {
            error: true,
            message: err.stack,
            status:500
        }
    }


}


exports.getUser = async (email, pass) => {

    const user = await User.findOne({
        email
    })

    if (!user) {
        return {
            error: true,
            message: "User Already Exist",
            status:400
        }
    }
   
    const validPassword = await bcrypt.compare(pass,user.password);
    if(!validPassword){
        return {
            error:true,
            message:"Password is wrong",
            status:400
        }
    }

    return {
        message:user,
        status:200
    }

}
