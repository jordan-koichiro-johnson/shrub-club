import { React } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function Navbar(props) {

  return (
    <div className='Navbar'>
      <nav>
        <Link to="/">Home</Link>
        {props.isLoggedIn ? (<Link to="/gameselect">GameSelect</Link>) : (<Link to="/Login">Login</Link>)}
        {props.isLoggedIn?(<Link to="/Logout">Logout</Link>):(<Link to="/Signup">Signup</Link>)}
      </nav>
    </div>
  )
}