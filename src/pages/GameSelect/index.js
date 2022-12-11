import React, { useState } from 'react'
import './style.css'

import { Randomize, Boggle } from './boggle/boggle'



export default function GameSelect() {
  const [isRandom, setRandom] = useState(false)
  if (!isRandom) {
    Randomize()
    setRandom(true)
  }
  return (
    <div className="GameSelect">

      <Boggle />
    </div>
  )
}
