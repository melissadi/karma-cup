import React, { Component } from 'react'
import Popup from '../components/Popup'

class RewardTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  togglePopup(){
    this.setState({ showPopup: !this.state.showPopup })
  }

  handleClick(){
    event.preventDefault()
    this.props.deleteReward(this.props.reward)
  }

  render(){

    return(
      <div className="rewards-tile">
        <div className="text">
          <h1>{this.props.name}</h1>
          <p>{this.props.description}</p>
          <p>Points Needed: {this.props.pointValue}</p>
        </div>
        <button onClick={this.togglePopup.bind(this)}>Edit</button>
        <button onClick={this.handleClick}>Delete</button>
        {this.state.showPopup ?
          <Popup
          text="Edit Reward"
          closePopup={this.togglePopup.bind(this)}
          rewardId={this.props.rewardId}
          storeId={this.props.storeId}
          selectReward={this.props.selectReward}
          closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    )
  }
}

export default RewardTile;
