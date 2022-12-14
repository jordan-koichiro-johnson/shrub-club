import { React } from 'react'
import { useNavigate } from "react-router-dom"

import './style.css'

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

function Howto({ }) {
  const navigate = useNavigate();

  return (
    <div className="backgroundDiv" style={{ backgroundImage: `url(${shrubBG})` }}>
      <div className='howto'>
        <h1 className="howtoTitle"> How to play? </h1>
          <h4 className='title-howto'>Welcome to Shrub club!</h4>
          <p className='title-howto'>You just successfullly achieved your first your shrub!</p>

          <div className='howtosection'>
            <h3 className='title-howto'>How to Take Care of Your Shrub?</h3>
            <p className='title-howto'>Now you have a shrub to take care of!</p>
            <p className='title-howto'>You can feed, clean, sleep, play shrubble, and chat with your shrub.</p>
            <p className='title-howto'>When you are talking to your shrub,</p>
            <p className='title-howto'>You should be careful with your words!</p>
            <p className='title-howto'>With the money that you earn from playing Shrubble,</p>
            <p className='title-howto'>You can open the chest at the store, to decorate your shrub!</p>
          </div>
          <div className='howtobottom'>
            <h2>Are You Ready to Meet Your Shrub?</h2>
            <a href='/'><button type="button" className="nes-btn is-primary">Let's go!</button></a>
          </div>
      </div>
    </div>
  )
}

export default Howto;