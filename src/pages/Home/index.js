import React from 'react'
import "./style.css"
import Voice from './voice/index'

export default function Home({ isLoggedIn }) {
  return (
    <div className="Home">
      {isLoggedIn ? (
        <div className={'logged'}>
          <h1>shrub generated page!</h1>
          <Voice />
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
