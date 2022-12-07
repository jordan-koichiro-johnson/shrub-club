import React from 'react'
import "./style.css"

export default function Home({ isLoggedIn }) {
  return (
    <div className="Home">
      {isLoggedIn ? (
        <div>
          <h1>shrub generated page!</h1>
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
