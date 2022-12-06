import React from 'react'
import "nes.css/css/nes.min.css"
import './login.css'

function Login() {
    return (<div className={"login"}>
        <div className={"nes-field"}>
            <label for="name_field">Username</label>
            <input type="text" id="name_field" className={"nes-input"}></input>

        </div>
        <div className={"nes-field"}>
            <label for="name_field">Password</label>
            <input type="text" id="name_field" className={"nes-input"}></input>

        </div>
    </div>)
}

export default Login