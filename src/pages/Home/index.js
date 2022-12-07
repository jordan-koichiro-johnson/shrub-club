import React from 'react'
import "./style.css"
// import shrub from '../'

export default function Home({ isLoggedIn }) {
  return (
    <div className="Home">
      {isLoggedIn ? (
        <div className='row'>
          <h1>shrub generated page!</h1>
          <div className="nes-container is-centered col-lg-10 col-sm-12 shrub">
            <img src="../src/assets/sprites/Untitled-Artwork-1.png" alt="character"/>
            <p>CoolBob smells like blue cheese.</p>
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
            <p>Level 1</p>
            <progress className="nes-progress" value="90" max="100"></progress>
            <p>Hunger</p>
            <progress className="nes-progress is-success" value="50" max="100"></progress>
            <p>Hygiene</p>
            <progress className="nes-progress is-error" value="10" max="100"></progress>
            <p>Happiness</p>
            <progress className="nes-progress is-warning" value="30" max="100"></progress>
            <p>Energy</p>
            <progress className="nes-progress is-success" value="90" max="100"></progress>
          </div>

          <div className="nes-container col-lg-6 col-md-12 col-sm-12 chat">

          </div>
        </div>) :
        (
          <div>
            <h1>Welcome to shrub club!</h1>
            <h2>Your Shrub is waiting for you</h2>
          </div>
        )}
    </div>
  )
}
