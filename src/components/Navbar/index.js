import { React, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

export default function Navbar(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isLoggedIn) {
      navigate("/")
    }
  }, [props.isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setIsLoggedIn(false);
    props.setToken(0);
  }

  return (
    <div className='Navbar'>
      <nav>
        <Link to="/">Home</Link>
        {props.isLoggedIn ? (<Link to="/gameselect">GameSelect</Link>) : (<Link to="/Login">Login</Link>)}
        {props.isLoggedIn ? (<button onClick={handleLogout}>Logout</button>) : (<Link to="/Signup">Signup</Link>)}
      </nav>
    </div>
  )
}