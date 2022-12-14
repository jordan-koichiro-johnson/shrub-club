import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../util/API'
import './style.css'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"

export default function ShrubStats({ clean, sleep, eat }) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    const navigate = useNavigate();
    const [optionData, setOptionData] = useState(false)
    const [shrubData, setShrubData] = useState("")
    const [shrubLevel, setShrubLevel] = useState(0)
    const [shrubHygiene, setShrubHygiene] = useState("")
    const [shrubEat, setShrubEat] = useState("")
    const [shrubEnergy, setShrubEnergy] = useState("")
    const [shrubHappiness, setShrubHappiness] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token")

        API.findcurrentUser(token).then(data => {
            console.log(data)
            setShrubHappiness(data.Shrub.happiness)
            setShrubData(data.Shrub)
            setShrubLevel(data.days)
            setShrubHygiene(data.Shrub.hygiene)
            setShrubEnergy(data.Shrub.energy)
            setShrubEat(data.Shrub.hunger)
            prograssbar()
            if (data.Shrub.hygiene < 0) {
                API.updateShrub({
                    name: data.Shrub.name,
                    level: data.Shrub.level,
                    hunger: data.Shrub.hunger - 2,
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
                    hunger: data.Shrub.hunger - 2,
                    hygiene: data.Shrub.hygiene - 2,
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
                    hunger: data.Shrub.hunger - 2,
                    hygiene: data.Shrub.hygiene - 5,
                    happiness: data.Shrub.happiness,
                    energy: data.Shrub.energy - 2,
                    ProfileId: data.Shrub.ProfileId,
                }).then(data => {
                    console.log(data)
                })
            }
            console.log(shrubEat)
        }).catch(err => {
            localStorage.removeItem("token")
            navigate("/")
            console.log(err)
        })
    }, [shrubHygiene, shrubEat, shrubEnergy, shrubHappiness])

    useEffect(() => {
        if (clean === true) {
            if (shrubHygiene >= 100) {

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
            if (shrubEnergy >= 100) {

                return
            } else {
                setTimeout(() => {
                    API.updateShrub({
                        name: shrubData.name,
                        level: shrubData.level,
                        hunger: shrubData.hunger - 2,
                        hygiene: shrubData.hygiene - 1,
                        happiness: shrubData.happiness - 1,
                        energy: shrubData.energy + 50,
                        ProfileId: shrubData.ProfileId,
                    }).then(data => {
                        console.log(data)
                        setShrubEnergy(shrubEnergy + 50)
                        if (optionData === true) {
                            setOptionData(false)
                        } else if (optionData === false) {
                            setOptionData(true)
                        }
                    })
                }, 100)
            }
        } else {
            return
        }
    }, [sleep])

    useEffect(() => {
        if (eat === true) {
            if (shrubEat >= 100) {

                return
            } else {
                console.log("eat")
                API.updateShrub({
                    name: shrubData.name,
                    level: shrubData.level,
                    hunger: shrubData.hunger + 50,
                    hygiene: shrubData.hygiene,
                    happiness: shrubData.happiness,
                    energy: shrubData.energy,
                    ProfileId: shrubData.ProfileId,
                }).then(data => {
                    console.log(data)
                    setShrubEat(shrubEat + 50)
                })
            }
        } else {
            return
        }
    }, [eat])

    const prograssbar = () => {
        // between 100 - 60
        const bar = document.querySelectorAll(".nes-progress")
        console.log(bar)
        compare(shrubEat, bar[1])
        compare(shrubHygiene, bar[2])
        compare(shrubData.happiness, bar[3])
        compare(shrubEnergy, bar[4])
    }

    const compare = (pro, part) => {
        console.log(pro, part)
        part.classList.remove("is-success")
        part.classList.remove("is-warning")
        part.classList.remove("is-error")
        if (pro > 70) {
            console.log(pro)
            part.classList.add("is-success")
        } else if (pro <= 70 && 40 < pro) {
            part.classList.add("is-warning")
        } else if (pro <= 40) {
            part.classList.add("is-error")
        }
    }

    return (
        <div className="statsBars">
            <div className='make-this-not-clip'>

                <p>Level {1 + parseInt(shrubLevel / 100)}</p>
                <progress className="nes-progress" value={shrubLevel % 100} data-bs-toggle="tooltip" data-bs-placement="top" title={shrubLevel % 100} max="100"></progress>
            </div>
            <div>

                <p>Hunger</p>
                <progress className="nes-progress" value={shrubEat} data-bs-toggle="tooltip" data-bs-placement="top" title={shrubEat} max="100"></progress>
            </div>
            <div>

                <p>Hygiene</p>
                <progress className="nes-progress is-error" value={shrubHygiene} data-bs-toggle="tooltip" data-bs-placement="top" title={shrubHygiene} max="100"></progress>
            </div>
            <div>

                <p>Happiness</p>
                <progress className="nes-progress is-warning" value={shrubHappiness} data-bs-toggle="tooltip" data-bs-placement="top" title={shrubHappiness} max="100"></progress>
            </div>
            <div>

                <p>Energy</p>
                <progress className="nes-progress is-success" value={shrubEnergy} data-bs-toggle="tooltip" data-bs-placement="top" title={shrubEnergy} max="100"></progress>
            </div>
        </div>
    )
}