import React from 'react';
import "./style.css"
import chest from "../../util/chest.png"
function storePage() {
    return (
      <div className = "shopBody">

        <div className="containerBG nes-container is-centered">
         <p>Welcome to the Shrub Shop!</p>
          <p>Open a chest and hope for the best!</p>
        </div>

        <div className="chestBG nes-container is-centered">
          <img className ="chestImg"src={chest} alt="chest"/>
          <p>$100 to open the chest.</p>
          <button type="button" className="nes-btn is-warning">Open the Chest</button>
          <p className="balance"> Your Current Balance: $4</p>
        </div>
          <div className="btns">
            <a className="nes-btn col-5" href="#">Return Back Home</a>
          </div>
      </div>
    )
}

export default storePage;