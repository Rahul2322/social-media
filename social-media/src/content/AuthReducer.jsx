 const AuthReducer = (state,action)=>{
    console.log(state,action)
        switch (action.type) {
            case 'LOGIN_START':
                return{
                    isFetching:true,
                    error:false,
                    user:null
                }
                
            case 'LOGIN_SUCCESS':
                return{
                    isFetching:false,
                    error:false,
                    user:action.payload
                }
                
            case 'LOGIN_FAILURE':
                return{
                    isFetching:false,
                    error:action.payload,
                    user:null
                }
                case "FOLLOW":
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: [...state.user.followings, action.payload],
                      },
                    };
                case "UNFOLLOW":
                    return {
                      ...state,
                      user: {
                        ...state.user,
                        followings: state.user.followings.filter(
                          (following) => following !== action.payload
                        ),
                      },
                    };    
        
            default:
               return state;
        }
    }

    export default AuthReducer