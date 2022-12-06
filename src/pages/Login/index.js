import {React, useState} from 'react'
import "nes.css/css/nes.min.css"
import './style.css'

function Login({ isLoggedIn, setIsLoggedIn }) {
    const [userId, setUserId] = useState("");
    // const [token, setToken] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    return (
      <div className='login'>
        <h1> Login </h1>
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
  
      

export default Login