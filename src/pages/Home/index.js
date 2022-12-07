import React from 'react'
import "./style.css"
import MyShrub from '../../components/MyShrub'
import ShrubStats from '../../components/ShrubStats'

export default function Home({ userId, setUserId, isLoggedIn, profileId, setProfileId, token, setToken }) {

// import Voice from './voice/index'

  return (
    <div className="Home">
      {isLoggedIn ? (
        <div className='row'>
          // <Voice />
          <div className="nes-container is-centered col-lg-10 col-sm-12 shrub">
            <MyShrub userId={userId} profileId={profileId} setProfileId={setProfileId} token={token} setToken={setToken} isLoggedIn={isLoggedIn} setUserId={setUserId} />
          </div>

          <div className="nes-container col-lg-2 col-md-6 col-sm-12 menu">
            <div className="lists">
              <ul className="nes-list">
                <li>Customize</li>
                <li>Chat</li>
                <li>Store</li>
                <li>Casino</li>
                <li>Options</li>
              </ul>
            </div>
          </div>

          <div className="nes-container is-centered col-lg-6 col-sm-12 status">
            <ShrubStats userId={userId} profileId={profileId} setProfileId={setProfileId} token={token} setToken={setToken} isLoggedIn={isLoggedIn} setUserId={setUserId} />
          </div>
          <div className="nes-container col-lg-6 col-md-12 col-sm-12 chat">

          </div>

        </div>) :
        (
          <div className={'notLogged'}>
            <h1>Welcome to shrub club!</h1>
            <h2>Your Shrub is waiting for you</h2>
            <Voice />
          </div>
        )}
    </div>
  )
}
