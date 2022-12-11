import './letters.css'
import React, { useState, useEffect } from "react";




function Letter({ name, letter, click, style }) {



    function doAddLetter() {
        click(name, letter)
    }

    return (
        <div className={'letterComp'}>
            <input type={'button'} id={name} className={`boggle-letter ${style}`} onClick={doAddLetter} value={letter} />
        </div>
    )
}



export default Letter