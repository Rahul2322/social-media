export const loginStart = (userCredential)=>{
    return {
        type:'LOGIN_START',    
    }
}

export const loginSuccess = (user)=>{
    return {
        type:'LOGIN_SUCCESS',
        payload:user
    }
}

export const loginFailure = (error)=>{
    return {
        type:'LOGIN_FAILURE',
        payload:error
    }
}

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });

