import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'

export default function ShrubStats({ setProfileId, setUserId }) {

    const [shrubLevel, setShrubLevel] = useState(0)
    const [shrubHunger, setShrubHunger] = useState(0)
    const [shrubHappiness, setShrubHappiness] = useState(0)
    const [shrubHygiene, setShrubHygiene] = useState(0)
    const [shrubEnergy, setShrubEnergy] = useState(0)


    useEffect(() => {
        const token = localStorage.getItem("token")
        API.findcurrentUser(token).then(data => {
            setUserId(data.UserId)
            setProfileId(data.id)
            setShrubLevel(data.Shrub.level)
            setShrubHunger(data.Shrub.hunger)
            setShrubHappiness(data.Shrub.happiness)
            setShrubHygiene(data.Shrub.hygiene)
            setShrubEnergy(data.Shrub.energy)
        })
    }, [])

    return (
        <div className="statsBars">
            <div className='make-this-not-clip'>

                <p>Level 1</p>
                <progress className="nes-progress" value={shrubLevel} max="100"></progress>
            </div>
            <div>

                <p>Hunger</p>
                <progress className="nes-progress is-success" value={shrubHunger} max="100"></progress>
            </div>
            <div>

                <p>Hygiene</p>
                <progress className="nes-progress is-error" value={shrubHygiene} max="100"></progress>
            </div>
            <div>

                <p>Happiness</p>
                <progress className="nes-progress is-warning" value={shrubHappiness} max="100"></progress>
            </div>
            <div>

                <p>Energy</p>
                <progress className="nes-progress is-success" value={shrubEnergy} max="100"></progress>
            </div>
        </div>
    )
}