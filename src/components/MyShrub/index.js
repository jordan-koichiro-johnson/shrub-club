import React, { useEffect, useState } from 'react'
import API from '../../util/API'
import './style.css'
import shrub from "../../assets/sprites/Shrub.png"
import blash from "../../assets/sprites/blash.png"

export default function MyShrub({ userId, profileId, isLoggedIn, setProfileId, token, setToken, setUserId }) {

  const [shurbName, setShrubName] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    API.findcurrentUser(token).then(data => {
      console.log(data)
      setUserId(data.UserId)
      setProfileId(data.id)
      setShrubName(data.Shrub.name)
    })
  }, [])

  return (
    <div className="GameSelect">
      <div className='clothes'>
        <img src={shrub} />
        <img src={blash}/>
      </div>
      <p>{shurbName} smells like blue cheese.</p>
    </div>
  )
}
