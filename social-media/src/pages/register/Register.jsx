import { useRef,useContext } from 'react';
import './register.css'
import {registerCall} from '../../apiCalls'
import { AuthContext } from '../../content/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const confirmPassword = useRef();
    const {isFetching,dispatch,user,error} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (e)=>{

       e.preventDefault();
       console.log(password.current.value)
       if(confirmPassword.current.value !== password.current.value){
        console.log('jddjdjdj')
         confirmPassword.current.setCustomValidity('confirm password does not match')
       }else{
            try {
                const user =   {
                    email:email.current.value,
                    password:password.current.value,
                    confirmPassword:confirmPassword.current.value,
                    username:username.current.value
                }

                await axios.post('http://localhost:8000/api/auth/register',user);
                navigate('/login')
            } catch (error) {
                console.log(error)
            }
        // registerCall({
        //     email:email.current.value,
        //     password:password.current.value,
        //     confirmPassword:confirmPassword.current.value,
        //     username:username.current.value},
        //     dispatch)
    }
}
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Rahul Social</h3>
                <span className="loginDesc">Connect with friends and the world around you</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" placeHolder="Username" className="loginInput" required ref={username} />
                    <input type="email" placeHolder="Email" className="loginInput" required ref={email} />
                    <input type="password" placeHolder="Password" className="loginInput" required ref={password} minLength={6} />
                    <input type="password" placeHolder="ConfirmPassword" className="loginInput" required ref={confirmPassword} />
                    <button type='submit' className="loginButton">Sign Up</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button  className="loginRegisterButton">
                        Log Into  Account
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
