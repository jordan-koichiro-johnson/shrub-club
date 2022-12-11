import { React, useEffect, useState } from "react";
import "./style.css"
import API from "../../util/API";

function Store({ userId }) {
  const text = document.querySelector(".textmessage");
  const [chestImg, setChestImg] = useState("chest")
  const [currentMoney, setCurrentMoney] = useState(0)
  const [newItem, setnewItem] = useState("default")
  const [profileInfo, setProfileInfo] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    API.currentUserWithProfile(token).then(data => {
      console.log(data)
      setProfileInfo(data.Profile)
      setCurrentMoney(data.Profile.money)
    })
  }, [])

  const buttonClick = () => {
    console.log(profileInfo)
    if (currentMoney < 100) {
      return console.log("click")
    } else {
      setTimeout(function () {
        setChestImg("chest")
        setnewItem("default")
        setCurrentMoney(currentMoney-100)
        text.innerHTML = ("$100 to open the chest.")
        API.updateProfile({
          money: currentMoney-100,
          days: profileInfo.days,
          UserId: profileInfo.UserId
        })
      }, 5000);
      let number = Math.floor(Math.random() * 25) + 1
      console.log(number)
      setChestImg("chestopen")
      API.getOneItem(number).then(data => {
        console.log(data)
        if (data === null) {
          console.log("I got you")
          text.innerHTML = ("I got you")
        } else {
          setnewItem(data.name)
          text.innerHTML = data.name
          console.log(profileInfo.id)
          API.createProfileTag({
            ProfileId: profileInfo.id,
            ItemId: data.id
          })
        }       
      })
    }
  }

  return (
    <div className="shopBody">

      <div className="containerBG nes-container is-centered">
        <p>Welcome to the Shrub Shop!</p>
        <p>Open a chest and hope for the best!</p>
      </div>

      <div className="chestBG nes-container is-centered">
        <img className="chestImg" src={require(`../../util/${chestImg}.png`)} alt="chest" />
        <img className="itemImg" src={require(`../../assets/sprites/${newItem}.png`)} alt="chest" />
        <p className="textmessage">$100 to open the chest.</p>
        <button type="button" className="nes-btn is-warning" onClick={buttonClick}>Open the Chest</button>
        <p className="balance"> Your Current Balance: ${currentMoney}</p>
      </div>
      <div className="btns">
        <a className="nes-btn col-5" href="/">Return Back Home</a>
      </div>
    </div>
  )
}

export default Store;