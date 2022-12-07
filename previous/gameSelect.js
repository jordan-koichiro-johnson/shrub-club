import React from 'react'
import { Boggle, Randomize } from './boggle'
import './gameSelect.css'

Randomize()

function GameSelect() {

    console.log('gameselect')
    return (<div className={'boggleDiv'}><Boggle /></div>)
}

export default GameSelect