import React, { useState } from 'react'
import MyShrub from '../../components/MyShrub'
import API from '../../util/API'
// import { SentimentAnalyzer, stemmer } from 'natural'
let recording = false

function Chat() {
    // const analyzer = new SentimentAnalyzer("English", stemmer, "afinn");
    const [micActive, setMicActive] = useState('Mic')
    const [value, setValue] = useState('')
    const [sentiment, setSentiment] = useState('')

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
        // setSentiment(analyzer.getSentiment(stringArray))
        const myInit = {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(stringArray),

        };

        API.natural(myInit, setSentiment).then(data => {
            const token = localStorage.getItem("token")
            API.findcurrentUser(token).then(data => {
                console.log(data.Shrub)
                const shrubInfo = data.Shrub;
                const happyup = parseInt(sentiment * 10)
                if (shrubInfo.happiness > 100) {
                    alert("your shub is happy enough")
                } else {
                    API.updateShrub({
                        name: shrubInfo.name,
                        level: shrubInfo.level,
                        hunger: shrubInfo.hunger - 5,
                        hygiene: shrubInfo.hygiene,
                        happiness: shrubInfo.happiness + happyup,
                        energy: shrubInfo.energy - 5,
                        ProfileId: shrubInfo.ProfileId
                    }).then(data => {
                        console.log(data)
                    })
                }
            })
        })
    }

    return (
        <div className='chat row'>
            <div className="nes-container is-centered col-lg-12 col-sm-12 box">
                <MyShrub />
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