import './letters.css'
import React, { useState, useEffect } from "react";




function Letter({ name, letter, click }) {



    function doAddLetter() {
        click(name, letter)

    }



    return (
        <div>
            <input type={'button'} className={"boggle-letter"} onClick={doAddLetter} value={letter} />
            { }
        </div>
    )
}



export default Letter