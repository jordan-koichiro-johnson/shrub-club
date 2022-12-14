import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import './style.css'
import API from '../../util/API';

//background images
import midnight from '../../util/time/11.12am.png';
import twoAM from '../../util/time/12.2am.png';
import fiveAM from '../../util/time/1.5am.png';
import sevenAM from '../../util/time/2.7am.png';
import nineAM from '../../util/time/3.9am.png';
import elevenAM from '../../util/time/4.11am.png';
import noon from '../../util/time/5.12pm.png';
import twoPM from '../../util/time/6.2pm.png';
import fourPM from '../../util/time/7.4pm.png';
import sixPM from '../../util/time/8.6pm.png';
import eightPM from '../../util/time/9.8pm.png';
import tenPM from '../../util/time/10.10pm.png';

let shrubBG = "";
const today = new Date();
let hour = today.getHours();
console.log(hour);
switch (hour) {
  case 0:
    shrubBG = midnight;
    break;

  case 1:
    shrubBG = midnight;
    break;

  case 2:
    shrubBG = twoAM;
    break;

  case 3:
    shrubBG = twoAM;
    break;

  case 4:
    shrubBG = twoAM;
    break;

  case 5:
    shrubBG = fiveAM;
    break;

  case 6:
    shrubBG = fiveAM;
    break;

  case 7:
    shrubBG = sevenAM;
    break;

  case 8:
    shrubBG = sevenAM;
    break;

  case 9:
    shrubBG = nineAM;
    break;

  case 10:
    shrubBG = nineAM;
    break;

  case 11:
    shrubBG = elevenAM;
    break;

  case 12:
    shrubBG = noon;
    break;

  case 13:
    shrubBG = noon;
    break;

  case 14:
    shrubBG = twoPM;
    break;

  case 15:
    shrubBG = twoPM;
    break;

  case 16:
    shrubBG = fourPM;
    break;

  case 17:
    shrubBG = fourPM;
    break;

  case 18:
    shrubBG = sixPM;
    break;

  case 19:
    shrubBG = sixPM;
    break;

  case 20:
    shrubBG = eightPM;
    break;

  case 21:
    shrubBG = eightPM;
    break;

  case 22:
    shrubBG = tenPM;
    break;

  case 23:
    shrubBG = tenPM;
    break;


}

function Signup({ isLoggedIn, setIsLoggedIn, userSignupId, setUserSignupId, userSignupPassword, setUserSignupPassword, setUserId, userId, token, setToken, profileId, setProfileId }) {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState('')

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log(isLoggedIn)
  //     navigate("/")
  //   }
  // }, [isLoggedIn])

  const handleSubmitSubmit = e => {
    e.preventDefault();
    document.querySelector(".username").classList.remove("is-error")
    document.querySelector(".password").classList.remove("is-error")
    if (userSignupId == "") {
      document.querySelector(".username").classList.add("is-error")
      setInvalid("Invalid Shrub or Password")
    } else if (userSignupPassword == "") {
      document.querySelector(".password").classList.add("is-error")
      setInvalid("Invalid Shrub or Password")
    } else if (userSignupPassword.length < 8) {
      document.querySelector(".password").classList.add("is-error")
      setInvalid("Password must be 8 characters or longer")
    } else {
      API.signup({
        userName: userSignupId,
        password: userSignupPassword
      }).then(data => {
        console.log(data)
        if (data.token) {
          setUserId(data.user.id)
          setToken(data.token)
          setIsLoggedIn(true)
          localStorage.setItem("token", data.token)
          createNewprofile(data.token);
        } else {
          document.querySelector(".username").classList.add("is-error")
          setInvalid('username taken')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const createNewprofile = (token) => {
    API.createprofile(token).then(data => {
      setProfileId(data.id)
      API.createShrub({
        name: userSignupId,
        ProfileId: data.id,
      }).then(data => {
        console.log(data)
        navigate("/howtoplay")
      })
    })
  }

  return (
    <div className="backgroundDiv" style={{ backgroundImage: `url(${shrubBG})` }}>
      <div className='signup'>
        <h1 className="signupTitle"> Sign Up! </h1>
        <form className='formSignup'>
          <label>Shrub Name</label>
          <input className="nes-input username" name="username" type="text" value={userSignupId} onChange={e => setUserSignupId(e.target.value)} />
          <label>Password</label>
          <input className="nes-input password" name="password" type="password" value={userSignupPassword} onChange={e => setUserSignupPassword(e.target.value)} />
          <div className='is-error'>{invalid}</div>
          <button type="button" className="nes-btn is-primary" onClick={handleSubmitSubmit}>Create</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;