import React from 'react';

const RewardTile = (props) => {

  return(
    <div className="rewards-tile">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.pointValue}</p>
    </div>

  )
}

export default RewardTile;
