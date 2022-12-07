import React from 'react'
import './style.css'
import Boggle from './boggle/boggle'

export default function GameSelect() {
  return (
    <div className="GameSelect">
      <h1>GameSelect page! Welcome to my site!</h1>
      <h2>Isnt react wonderful?</h2>
      <Boggle />
    </div>
  )
}
