import { React, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import './style.css'
import API from '../../util/API';

function Signup({ isLoggedIn, setIsLoggedIn, userSignupId, setUserSignupId, userSignupPassword, setUserSignupPassword, setUserId, userId, token, setToken, profileId, setProfileId }) {
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
    if (userSignupId == "") {
      document.querySelector(".username").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "no empty blank!"
    } else if (userSignupPassword == "") {
      document.querySelector(".password").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "no empty blank!"
    } else if (userSignupPassword.length < 8) {
      document.querySelector(".password").classList.add("is-error")
      document.querySelector(".alert").innerHTML = "password length should be more than 8"
    } else {
      API.signup({
        userName: userSignupId,
        password: userSignupPassword
      }).then(data => {
        if (data.token) {
          setUserId(data.user.id)
          setToken(data.token)
          setIsLoggedIn(true)
          localStorage.setItem("token", data.token)
          createNewprofile(data.token);
        } else {
          document.querySelector(".username").classList.add("is-error")
          document.querySelector(".alert").innerHTML = "try different user name"
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const createNewprofile = (token) => {
    API.createprofile(token).then(data => {
      setProfileId(data.id)
      API.createShrub({
        ProfileId: data.id,
      }).then(data => {
        console.log(data)
      })
    })
  }

  return (
    <div className='signup'>
      <h1> SignUp </h1>
      <form className='fromSignup'>
        <label>Username</label>
        <input className="nes-input username" name="username" type="text" value={userSignupId} onChange={e => setUserSignupId(e.target.value)} />
        <label>Password</label>
        <input className="nes-input password" name="password" type="password" value={userSignupPassword} onChange={e => setUserSignupPassword(e.target.value)} />
        <h3 className='alert'> Ready to play with your Shrub?</h3>
        <button type="button" className="nes-btn is-primary" onClick={handleSubmitSubmit}>Create</button>
      </form>
    </div>
  )
}

export default Signup;