import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import './style.css'
import API from '../../util/API';

function Login({ isLoggedIn, setIsLoggedIn, userLoginId, setUserLoginId, userLoginPassword, setUserLoginPassword, setUserId, userId, token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  const handleLoginSubmit = e => {
    e.preventDefault();
    document.querySelector(".username").classList.remove("is-error")
    document.querySelector(".password").classList.remove("is-error")
    if (userLoginId == "") {
      document.querySelector(".username").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "no empty blank!"
    } else if (userLoginPassword == "") {
      document.querySelector(".password").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "no empty blank!"
    } else if (userLoginPassword.length < 8) {
      document.querySelector(".password").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "password length should be more than 8"
    } else {
      API.login({
        userName: userLoginId,
        password: userLoginPassword
      }).then(data => {
        console.log(data);
        if (data.token) {
          setUserId(data.user.id)
          setToken(data.token)
          setIsLoggedIn(true)
          localStorage.setItem("token", data.token)
        }
      }).catch(err => {
        console.log(err)
        document.querySelector(".username").classList.add("is-error")
        document.querySelector(".password").classList.add("is-error")
        document.querySelector(".alert").innerHTML = "Invalid User"
      })
    }
  }

  return (
    <div className='login'>
      <h1> Login </h1>
      <form className='fromSignup'>
        <label>Username</label>
        <input className="nes-input username" name="username" type="text" value={userLoginId} onChange={e => setUserLoginId(e.target.value)} />
        <label>Password</label>
        <input className="nes-input password" name="password" type="password" value={userLoginPassword} onChange={e => setUserLoginPassword(e.target.value)} />
        <h3 className='alert'> Ready to play with your Shrub?</h3>
        <button type="button" className="nes-btn is-primary" onClick={handleLoginSubmit}>Create</button>
      </form>
    </div>
  )
}

export default Login