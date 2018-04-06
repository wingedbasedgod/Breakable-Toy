import React from 'react';
import { Link } from 'react-router';

const PatternShow = props => {
  let handClassRight = ""
  let handClassLeft = ""

  if (props.handClass == 'right') {
    handClassRight = 'right-active'
    handClassLeft = ''
  } else if (props.handClass == 'left') {
    handClassRight = ''
    handClassLeft = 'left-active'
  } else {
    handClassRight = ''
    handClassLeft = ''
  }

  return(
    <div className="pattern-show">
      <h1>{props.name}</h1>

      <div className="play-button">
        <button onClick={props.onPlayClick}>Play</button>
      </div>

      <div className="hand">
        <div id="left" className={handClassLeft}>
          <p>Left   </p>
        </div>

        <div id="right" className={handClassRight}>
          <p>Right</p>
        </div>
      </div>
    </div>
  )
}

export default PatternShow;
