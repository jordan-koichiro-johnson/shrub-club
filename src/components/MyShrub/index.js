import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'
import shrub from "../../assets/sprites/base.png"
import color from "../../assets/sprites/normal.png"

export default function MyShrub({ clean, sleep, eat }) {

  const [shurbName, setShrubName] = useState("")
  const [headItem, setHeadItem] = useState("default")
  const [eyeItem, setEyeItem] = useState("default")
  const [mouthItem, setMouthItem] = useState("default")
  const [shrubstatusHappy, setShrubstatusHappy] = useState("default")
  const [shrubstatusHunger, setShrubstatusHunger] = useState("default")
  const [shrubOption, setShrubOption] = useState("default")
  const [statusEye, setStatusEye] = useState("eye")
  
  useEffect(() => {
    const token = localStorage.getItem("token")

    console.log(statusEye)
    API.findcurrentUser(token).then(data => {
      setShrubName(data.Shrub.name)
      if (data.Shrub.happiness >= 80) {
        setShrubstatusHappy("happy")
      } else if (data.Shrub.happiness < 30) {
        setShrubstatusHappy("sad")
      }
      if (data.Shrub.hunger < 30) {
        setShrubstatusHunger("mad")
      } else {
        setShrubstatusHunger("default")
      }
    }).then(data => {
      API.getShrubTagCurrent(token).then(data => {
        data.map((map) => {
          API.getOneItem(map.ItemId).then(data => {
            if (data.type === "head") {
              setHeadItem(data.name)
            } else if (data.type === "eye") {
              setEyeItem(data.name)
            } else if (data.type === "mouth") {
              setMouthItem(data.name)
            }
          })
        })
      })
    })
  }, [clean, sleep, eat])

  useEffect(() => {
    console.log(clean)
    if (clean === true) {
      setShrubOption("cleaning")
    } else {
      setShrubOption("default");
    }
  }, [clean])

  useEffect(() => {
    console.log(sleep)
    if (sleep === true) {
      setStatusEye("sleep")
    } else if (sleep === false) {
      setStatusEye("eye")
    }
  }, [sleep])

  useEffect(() => {
    console.log(eat)
    if (eat === true) {
      setShrubOption("watering")
    } else {
      setShrubOption("default");
    }
  }, [eat])

  return (
    <div className="GameSelect">
      <div className='clothes'>
        <img src={color} />
        <img src={shrub} />
        <img src={require(`../../assets/options/${statusEye}.png`)} />
        <img src={require(`../../assets/sprites/${headItem}.png`)} />
        <img src={require(`../../assets/sprites/${mouthItem}.png`)} />        <img src={require(`../../assets/sprites/${shrubstatusHunger}.png`)} />
        <img src={require(`../../assets/sprites/${shrubstatusHappy}.png`)} />
        <img src={require(`../../assets/sprites/${eyeItem}.png`)} />
        <img src={require(`../../assets/options/${shrubOption}.png`)} />
        <p className={'description'}>{shurbName} smells like blue cheese.</p>
      </div>

    </div>
  )
}
