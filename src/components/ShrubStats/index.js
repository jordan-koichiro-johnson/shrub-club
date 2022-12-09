import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'

export default function ShrubStats() {
    const [shrubData, setShrubData] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        API.findcurrentUser(token).then(data => {
            console.log(data)
            setShrubData(data.Shrub)
            if (data.Shrub.hygiene > 0) {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: data.Shrub.hunger,
                    hygiene: data.Shrub.hygiene - 5,
                    happiness: data.Shrub.happiness,
                    energy: data.Shrub.energy,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            }
        })
    }, [])

    return (
        <div className="statsBars">
            <div className='make-this-not-clip'>

                <p>Level {1 + parseInt(shrubData.level / 100)}</p>
                <progress className="nes-progress" value={shrubData.level % 100} max="100"></progress>
            </div>
            <div>

                <p>Hunger</p>
                <progress className="nes-progress is-success" value={shrubData.hunger} max="100"></progress>
            </div>
            <div>

                <p>Hygiene</p>
                <progress className="nes-progress is-error" value={shrubData.hygiene - 5} max="100"></progress>
            </div>
            <div>

                <p>Happiness</p>
                <progress className="nes-progress is-warning" value={shrubData.happiness} max="100"></progress>
            </div>
            <div>

                <p>Energy</p>
                <progress className="nes-progress is-success" value={shrubData.energy} max="100"></progress>
            </div>
        </div>
    )
}