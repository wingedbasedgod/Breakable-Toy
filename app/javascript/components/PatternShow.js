import React from 'react';
import { Link } from 'react-router';

const PatternShow = props => {
  return(
    <div className="pattern-show">
      <h1>{props.name}</h1>

      <ul id="pattern-discription">
        <li label="subdivion"><strong>Subdivision:</strong> {props.subdivision}</li>
        <li label="pattern-id"><strong>Pattern number:</strong> {props.id}</li>
      </ul>

      <div className="play-button">
        <button onClick={props.onPlayClick}>Play</button>
      </div>

      <Link to='/' className='back-to-pattern'>
        Back to Pattern List
      </Link>

      <div className="hand">
        <h1><div id="right">
          Right
        </div></h1>

        <h1><div id="left">
          Left
        </div></h1>
      </div>
    </div>
  )
}

export default PatternShow;
