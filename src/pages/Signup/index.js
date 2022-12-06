import { React, useState } from 'react'
import "nes.css/css/nes.min.css"
import './style.css'

function Signup({ isLoggedIn, setIsLoggedIn }) {
  const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const inputchange = (e) => {
    setUserId(e.target.value)
    console.log(userId)
  }

  return (
    <div className='signup'>
      <h1> SignUp </h1>
      <form className='fromSignup'>
        <label>Username</label>
        <input className="nes-input" name="username" type="text" value={userId} onChange={e => setUserId(e.target.value)} />
        <label>Password</label>
        <input className="nes-input" name="password" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />

        <button type="button" className="nes-btn is-primary">Create</button>
      </form>
    </div>
  )
}

export default Signup;