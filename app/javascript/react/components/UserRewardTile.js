import React, { Component } from 'react'
import RedemptionPopup from '../containers/RedemptionPopup'

class RewardTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    event.preventDefault()
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup })
  }

  render(){

    let redeem
    if (this.props.userPoints >= this.props.reward.point_value){
      redeem = <button className="round" onClick={this.togglePopup.bind(this)}>Redeem</button>
    } else {
      redeem = <span>Earn {this.props.reward.point_value - this.props.userPoints} more points to redeem</span>
    }

    return(
      <div className="rewards-tile">
        <div className="text">
          <h1>{this.props.reward.name} at {this.props.store.name}</h1>
          <p>{this.props.reward.description}</p>
          <p>Points Needed: {this.props.reward.point_value}</p>
        </div>
        {redeem}
        {this.state.showPopup ?
        <RedemptionPopup
          text='Redeem Reward'
          closePopup={this.togglePopup.bind(this)}
          redeemPoints={this.props.redeemPoints}
          requiredPoints={this.props.reward.point_value}
        />
        : null
        }
      </div>
    )
  }
}

export default RewardTile;
