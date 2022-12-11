import React from 'react'
import './style.css'

import { Randomize, Boggle } from './boggle/boggle'



export default function GameSelect() {
  Randomize()
  return (
    <div className="GameSelect">

      <Boggle />
    </div>
  )
}
