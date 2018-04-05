import React from 'react';
import { Link } from 'react-router';

const PatternTile = props => {
  return(
    <div id="pattern-display">
      <div className="container"><Link to={`/patterns/${props.id}`}>
        <h3>{props.name}</h3><br />
      </Link></div>
    </div>
  )
}

export default PatternTile;
