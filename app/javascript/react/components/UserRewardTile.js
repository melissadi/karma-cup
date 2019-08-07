import React, { Component } from 'react'

class RewardTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    event.preventDefault()
  }

  render(){

    let redeem
    if (this.props.userPoints >= this.props.reward.point_value){
      redeem = <button onClick={this.handleClick}>Redeem</button>
    } else {
      redeem = <span>Earn {this.props.reward.point_value - this.props.userPoints} more points to redeem</span>
    }

    return(
      <div className="rewards-tile">
        <div className="text">
          <h1>{this.props.reward.name}</h1>
          <h2>{this.props.store.name}</h2>
          <p>{this.props.reward.description}</p>
          <p>Points Needed: {this.props.reward.point_value}</p>
        </div>
        {redeem}
      </div>
    )
  }
}

export default RewardTile;
