import React, { useState } from 'react'
import MyShrub from '../../components/MyShrub'
import API from '../../util/API'
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

let recording = false

function Chat({ shrubHappy, setShrubHappy }) {

    const [micActive, setMicActive] = useState('Mic')
    const [value, setValue] = useState('')
    const [sentiment, setSentiment] = useState(0)



    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.addEventListener('start', startSpeechRecognition)
    recognition.addEventListener('end', endSpeechRecognition)
    recognition.addEventListener('result', resultSpeechRecognition)
    function MicButton() {
        console.log('in onclick')
        if (recording === false && SpeechRecognition) {

            setMicActive('recording')
            recognition.start()
        }
        if (recording === true && SpeechRecognition) {

            setMicActive('Mic')
            recognition.stop()
        }
        if (!SpeechRecognition) {
            setMicActive('Mic not working')
        }
        recording = !recording
    }

    function startSpeechRecognition() {
        console.log('recognizing')
    }

    function endSpeechRecognition() {
        console.log('end recognizing')
        MicButton()
    }

    function resultSpeechRecognition(event) {

        setValue(event.results[0][0].transcript)
        const str = event.results[0][0].transcript;
        const stringArray = str.split(/(\s+)/);

        const myInit = {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(stringArray),

        };

        API.natural(myInit).then(data => {
            console.log(data)
            setSentiment(data)
            updateShrub(parseInt(data * 10))
        })
    }

    const updateShrub = (happy) => {
        const token = localStorage.getItem("token")
        API.findcurrentUser(token).then(data => {
            console.log(data.Shrub)
            console.log(happy)
            API.updateShrub({
                name: data.Shrub.name,
                level: data.Shrub.level,
                hunger: data.Shrub.hunger,
                hygiene: data.Shrub.hygiene,
                happiness: data.Shrub.happiness + happy,
                energy: data.Shrub.energy,
                ProfileId: data.Shrub.ProfileId,
            })
        }).catch(err => {
            console.log(err)
        })

    }

    return (

        <div className='chat row'>
            <div className="nes-container is-centered col-lg-12 col-sm-12 box" style={{ backgroundImage: `url(${shrubBG})` }}>
                <div className='shrubName'>

                    <MyShrub />
                </div>
                <p>{parseInt(sentiment * 10)} Happiness</p>
            </div>
            <div className="col-lg-12 col-sm-12 bodt">
                <form>
                    <label for={"talk"}>
                        Talk:
                    </label>
                    <input type={"text"} id={"talk"} name={"talk"} value={value} className="nes-textarea" />
                    <button type={'button'} className="nes-btn is-primary" onClick={MicButton}>🎤Mic{micActive}</button>
                    <button type={'button'} className="nes-btn is-success" >Send Message</button>
                </form>
            </div>

        </div>
    )
}

export default Chat