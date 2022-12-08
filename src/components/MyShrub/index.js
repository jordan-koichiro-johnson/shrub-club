import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'
import shrub from "../../assets/sprites/Shrub.png"

export default function MyShrub({ setProfileId }) {

  const [shurbName, setShrubName] = useState("")
  const [headItem, setHeadItem] = useState("default")
  const [eyeItem, setEyeItem] = useState("default")
  const [mouthItem, setMouthItem] = useState("default")
  const [shrubstatusHappy, setShrubstatusHappy] = useState("default")
  const [shrubstatusHunger, setShrubstatusHunger] = useState("default")

  useEffect(() => {
    const token = localStorage.getItem("token")
    API.findcurrentUser(token).then(data => {
      setShrubName(data.Shrub.name)
      if(data.Shrub.happiness >= 80) {
        setShrubstatusHappy("happy")
      } else if(data.Shrub.happiness < 30) {
        setShrubstatusHappy("sad")
      } 
      if(data.Shrub.Hunger < 30) {
        setShrubstatusHunger("mad")
      }
    }).then(data => {
      API.getShrubTagCurrent(token).then(data => {
        data.map((map) => {
          API.getOneItem(map.ItemId).then(data => {
            if(data.type === "head") {
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
  }, [])

  return (
    <div className="GameSelect">
      <div className='clothes'>
        <img src={shrub} />
        <img src={require(`../../assets/sprites/${shrubstatusHunger}.png`)} />
        <img src={require(`../../assets/sprites/${shrubstatusHappy}.png`)} />
        <img src={require(`../../assets/sprites/${headItem}.png`)} />
        <img src={require(`../../assets/sprites/${mouthItem}.png`)} />
        <img src={require(`../../assets/sprites/${eyeItem}.png`)} />
        <p className={'description'}>{shurbName} smells like blue cheese.</p>
      </div>

    </div>
  )
}
