import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'

export default function ShrubStats({ clean, sleep, eat }) {
    const [optionData, setOptionData] = useState(false)
    const [shrubData, setShrubData] = useState("")
    const [shrubHygiene, setShrubHygiene] = useState("")
    const [shrubEat, setShrubEat] = useState("")
    const [shrubEnergy, setShrubEnergy] = useState("")


    useEffect(() => {
        const token = localStorage.getItem("token")
        API.findcurrentUser(token).then(data => {
            console.log(data)
            setShrubData(data.Shrub)
            setShrubHygiene(data.Shrub.hygiene)
            setShrubEat(data.Shrub.hunger)
            setShrubEnergy(data.Shrub.energy)
            if (data.Shrub.hygiene < 0) {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: data.Shrub.hunger - 5,
                    hygiene: 0,
                    happiness: data.Shrub.happiness,
                    energy: data.Shrub.energy - 1,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            } else if (data.Shrub.hunger < 0) {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: 0,
                    hygiene: data.Shrub.hygiene - 5,
                    happiness: data.Shrub.happiness,
                    energy: data.Shrub.energy - 1,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            } else if (data.Shrub.energy < 0) {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: data.Shrub.hunger - 5,
                    hygiene: data.Shrub.hygiene - 5,
                    happiness: data.Shrub.happiness,
                    energy: 0,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            } else {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: data.Shrub.hunger - 5,
                    hygiene: data.Shrub.hygiene - 5,
                    happiness: data.Shrub.happiness,
                    energy: data.Shrub.energy - 1,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            }
        })
    }, [optionData])

    useEffect(() => {
        if (clean === true) {
            if (shrubData.hygiene >= 100) {
                alert("Shrub is already clean")
                return
            } else {
                API.updateShrub({
                    name: shrubData.name,
                    level: shrubData.level,
                    hunger: shrubData.hunger,
                    hygiene: 100,
                    happiness: shrubData.happiness,
                    energy: shrubData.energy,
                    ProfileId: shrubData.ProfileId,
                }).then(data => {
                    console.log(data)
                    setShrubHygiene(100)
                    if (optionData === true) {
                        setOptionData(false)
                    } else if (optionData === false) {
                        setOptionData(true)
                    }
                })
            }
        } else {
            return
        }
    }, [clean])

    useEffect(() => {
        if (sleep === true) {
            if (shrubData.energy >= 100) {
                alert("full energy")
                return
            } else {
                do {
                    setTimeout(() => {
                        API.updateShrub({
                            name: shrubData.name,
                            level: shrubData.level,
                            hunger: shrubData.hunger - 2,
                            hygiene: shrubData.hygiene - 1,
                            happiness: shrubData.happiness - 1,
                            energy: shrubData.energy + 10,
                            ProfileId: shrubData.ProfileId,
                        }).then(data => {
                            console.log(data)
                            setShrubEnergy(shrubEnergy + 10)
                            if (optionData === true) {
                                setOptionData(false)
                            } else if (optionData === false) {
                                setOptionData(true)
                            }
                        })
                    }, 100)
                } while (shrubEnergy === 100)
            }
        } else {
            return
        }
    }, [sleep])

    useEffect(() => {
        if (eat === true) {
            if (shrubData.hunger >= 100) {
                alert("Shrub is already full")
                return
            } else {
                console.log("eat")
                API.updateShrub({
                    name: shrubData.name,
                    level: shrubData.level,
                    hunger: shrubData.hunger + 25,
                    hygiene: shrubData.hygiene,
                    happiness: shrubData.happiness,
                    energy: shrubData.energy,
                    ProfileId: shrubData.ProfileId,
                }).then(data => {
                    console.log(data)
                    setShrubEat(shrubEat + 25)
                })
            }
        } else {
            return
        }
    }, [eat])

    return (
        <div className="statsBars">
            <div className='make-this-not-clip'>

                <p>Level {1 + parseInt(shrubData.level / 100)}</p>
                <progress className="nes-progress" value={shrubData.level % 100} max="100"></progress>
            </div>
            <div>

                <p>Hunger</p>
                <progress className="nes-progress is-success" value={shrubEat - 5} max="100"></progress>
            </div>
            <div>

                <p>Hygiene</p>
                <progress className="nes-progress is-error" value={shrubHygiene} max="100"></progress>
            </div>
            <div>

                <p>Happiness</p>
                <progress className="nes-progress is-warning" value={shrubData.happiness} max="100"></progress>
            </div>
            <div>

                <p>Energy</p>
                <progress className="nes-progress is-success" value={shrubEnergy - 1} max="100"></progress>
            </div>
        </div>
    )
}