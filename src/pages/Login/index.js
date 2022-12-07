import {React, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import "nes.css/css/nes.min.css"
import './style.css'
import API from '../../util/API';

function Login({ isLoggedIn, setIsLoggedIn, userLoginId,  setUserLoginId,  userLoginPassword, setUserLoginPassword, setUserId, userId, token, setToken}) {
    const navigate = useNavigate();

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/")
        }
    },[isLoggedIn])

    const handleLoginSubmit = e => {
        e.preventDefault(); 
        API.login({
            userName: userLoginId,
            password: userLoginPassword
        }).then(data => {
            console.log(data);
            if(data.token) {
                setUserId(data.user.userName)
                setToken(data.token)
                setIsLoggedIn(true)
                localStorage.setItem("token",data.token)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
      <div className='login'>
        <h1> Login </h1>
        <form className='fromSignup'>
          <label>Username</label>
          <input className="nes-input" name="username" type="text" value={userLoginId} onChange={e => setUserLoginId(e.target.value)} />
          <label>Password</label>
          <input className="nes-input" name="password" type="password" value={userLoginPassword} onChange={e => setUserLoginPassword(e.target.value)} />
          <button type="button" className="nes-btn is-primary" onClick={handleLoginSubmit}>Create</button>
        </form>
      </div>
    )
  }
  
export default Login