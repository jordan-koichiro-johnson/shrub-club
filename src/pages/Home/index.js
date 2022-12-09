import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import MyShrub from '../../components/MyShrub'
import ShrubStats from '../../components/ShrubStats'

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

export default function Home({ userId, setUserId, isLoggedIn, profileId, setProfileId, token, setToken, shrubId, setShrubId }) {


  return (
    <div className="Home">
      {isLoggedIn ? (
        <div className='row'>

          <div className="nes-container is-centered col-lg-9 col-sm-12 shrub" style={{ backgroundImage: `url(${shrubBG})` }}>

            <MyShrub userId={userId} profileId={profileId} setProfileId={setProfileId} token={token} setToken={setToken} isLoggedIn={isLoggedIn} setUserId={setUserId} shrubId={shrubId} setShrubId={setShrubId} />


          </div>

          <div className="nes-container col-lg-3 col-md-6 col-sm-12 menu">
            <div className="lists">
              <ul className="nes-list">
                <li><Link to="customize">Customize</Link></li>
                <li><Link to="chat">Chat</Link></li>
                <li><Link to="store">Store</Link></li>
                <li>Casino</li>
                <li>Options</li>
              </ul>
            </div>
          </div>

          <div className="nes-container is-centered col-lg-8 col-sm-12 status">
            <ShrubStats userId={userId} profileId={profileId} setProfileId={setProfileId} token={token} setToken={setToken} isLoggedIn={isLoggedIn} setUserId={setUserId} />
          </div>
          <div className="nes-container col-lg-4 col-md-12 col-sm-12 chat">

          </div>

        </div>) :
        (
          <div className='notLogged'>
            <h1>Welcome to shrub club!</h1>
            <h2>Your Shrub is waiting for you</h2>

          </div>
        )}
    </div>

  )
}
