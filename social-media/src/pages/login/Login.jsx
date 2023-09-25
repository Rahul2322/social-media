import { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../content/AuthContext';
import {CircularProgress}  from '@mui/material'
import {} from 'react-router-dom'
export default function Login() {
    const email = useRef();
    const password = useRef();
    const {isFetching,dispatch,user,error} = useContext(AuthContext)
    const handleLoginClick = (e)=>{
       e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Rahul Social</h3>
                <span className="loginDesc">Connect with friends and the world around you</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleLoginClick}>
                    <input type="email" placeHolder="Email" className="loginInput" required ref={email}/>
                    <input type="password" minLength={6} placeHolder="Password" required className="loginInput" ref={password} />
                    <button type='submit' className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress color='secondary' size="20px"/> : 'LogIn'}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                    {isFetching ? <CircularProgress color='secondary' size="20px"/> : "Create a New Account"}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
