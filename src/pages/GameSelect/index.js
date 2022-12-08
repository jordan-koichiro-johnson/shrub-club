import React from 'react'
import './style.css'

import { Randomize, Boggle } from './boggle/boggle'

Randomize()

export default function GameSelect() {
  return (
    <div className="GameSelect">

      <Boggle />
    </div>
  )
}
