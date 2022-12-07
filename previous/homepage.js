import React from 'react'
import "nes.css/css/nes.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './homepage.css'
import Character from '../assets/index.js'

function Homepage() {
    return (<div className={"home"}>

        <div className={"row"}>

            <div className={"nes-container is-centered col-10 col"}>
                <img className={"character"} src={Character} alt={"character"}></img>
                <p>CoolBob smells like blue cheese.</p>
            </div>

            <div className={"nes-container col-2 col"}>
                <div class={"lists"}>
                    <ul className={"nes-list"}>
                        <li>


                            Games

                        </li>
                        <li >


                            Customize

                        </li>
                        <li >


                            Chat

                        </li>
                        <li>


                            Store

                        </li>
                        <li>

                            Casino

                        </li>
                        <li >


                            Options

                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={'row'}>

            <div class={"nes-container is-centered col-6 col"}>
                <p>Level 1</p>
                <progress className={"nes-progress"} value={"90"} max={"100"}></progress>
                <p>Hunger</p>
                <progress class={"nes-progress is-success"} value={"50"} max={"100"}></progress>
                <p>Hygiene</p>
                <progress class={"nes-progress is-error"} value={"10"} max={"100"}></progress>
                <p>Happiness</p>
                <progress class={"nes-progress is-warning"} value={"30"} max={"100"}></progress>
                <p>Energy</p>
                <progress class={"nes-progress is-success"} value={"90"} max={"100"}></progress>
            </div>
            <div class="nes-container col-6 col">

            </div>
        </div>
    </div>)
}

export default Homepage