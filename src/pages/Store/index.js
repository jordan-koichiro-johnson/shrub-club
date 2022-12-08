import React from 'react';
import "./style.css"
import chest from "../../util/chest.png"
function storePage() {
    return (
      <div className = "shopBody">
        <div>
          <img src={chest} alt="chest"/>
        </div>
          <div className="btns">
            <a className="nes-btn col-5" href="#">Return Back Home</a>
          </div>
      </div>
    )
}

export default storePage;