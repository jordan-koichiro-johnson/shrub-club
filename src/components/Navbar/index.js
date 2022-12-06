import { React } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function Navbar(props) {
  return (
    <div className='Navbar'>
      <nav>
        <Link to="/">Home</Link>
        {props.isLoggedIn ? (
          <div>
            <Link to="/gameselect">GameSelect</Link>
            {/* <Link to="/Logout">GameSelect</Link> */}
          </div>

        ) : (
          <div>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  )
}