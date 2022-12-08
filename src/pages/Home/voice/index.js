import React, { useState } from 'react'
import API from '../../../util/API'
// import { SentimentAnalyzer, stemmer } from 'natural'
let recording = false

function Voice() {
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

        API.natural(myInit, setSentiment)
        //TODO: if negative, happiness down, if positive happiness up
    }


    return (
        <div>

            <form>
                <label for={"talk"}>
                    Talk:
                </label>

                <input type={"text"} id={"talk"} name={"talk"} value={value} />
                <button type={'button'} onClick={MicButton}>{micActive}</button>
                <button type={'button'}>Submit</button>
                {sentiment}
            </form>
        </div>
    )
}

export default Voice