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
    <div >
      <nav className='Navbar'>


        <Link to="/" className={'nav-link'}>
          <div className={'nes-btn'}>
            Home
          </div>

        </Link>

        <div >

          {props.isLoggedIn ? (<Link to="/gameselect" className={'nav-link'}>
            <div className={'nes-btn'}>
              Game Select
            </div>
          </Link>) :
            (<Link to="/Login" className={'nav-link'}>
              <div className={'nes-btn'}>
                Login
              </div></Link>)}
        </div>
        <div >

          {props.isLoggedIn ? (<button onClick={handleLogout} className={'nav-link logout'}>
            <div className={'nes-btn'}>
              Logout
            </div>
          </button>) :
            (<Link to="/Signup" className={'nav-link'}>
              <div className={'nes-btn'}>
                Signup
              </div>
            </Link>)}
        </div>
      </nav>
    </div>
  )
}