import axios from "axios";

export const loginCall = async(userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("http://localhost:8000/api/auth/login",userCredential);
        console.log(res.data,"res")
        dispatch({type:"LOGIN_SUCCESS",payload:res.data.data.message})
    }catch(err){
        console.log('errrrrr',err)
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}

export const registerCall = async(userCredential,dispatch)=>{
    dispatch({type:""})
}