import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "nes.css/css/nes.min.css"
import './style.css'
import API from '../../util/API';

function Signup({ isLoggedIn, setIsLoggedIn, userSignupId, setUserSignupId, userSignupPassword, setUserSignupPassword, setUserId, userId, token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn])

  const handleSubmitSubmit = e => {
    e.preventDefault();
    document.querySelector(".username").classList.remove("is-error")
    document.querySelector(".password").classList.remove("is-error")
    if (userSignupId=="") {
      document.querySelector(".username").classList.add("is-error")
      alert("no empty blank!")
    } else if (userSignupPassword=="") {
      document.querySelector(".password").classList.add("is-error")
      alert("no empty blank!")
    } else if (userSignupPassword.length < 8) {
      document.querySelector(".password").classList.add("is-error")
      alert("password length should be more than 8")
    } else {
      API.signup({
        userName: userSignupId,
        password: userSignupPassword
      }).then(data => {
        console.log(data);
        if (data.token) {
          setUserId(data.user.userName)
          setToken(data.token)
          setIsLoggedIn(true)
          localStorage.setItem("token", data.token)
          createprofile(data.token);
        } else {
          document.querySelector(".username").classList.add("is-error")
          alert("try different user name")
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const createprofile = (token) => {
    console.log(token)
  }

  return (
    <div className='signup'>
      <h1> SignUp </h1>
      <form className='fromSignup'>
        <label>Username</label>
        <input className="nes-input username" name="username" type="text" value={userSignupId} onChange={e => setUserSignupId(e.target.value)} />
        <label>Password</label>
        <input className="nes-input password" name="password" type="password" value={userSignupPassword} onChange={e => setUserSignupPassword(e.target.value)} />
        <h3> Ready to play with your Shrub?</h3>
        <button type="button" className="nes-btn is-primary" onClick={handleSubmitSubmit}>Create</button>
      </form>
    </div>
  )
}

export default Signup;