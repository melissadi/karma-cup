import React, { Component } from 'react'
import FormPopup from '../components/FormPopup'

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
          <p>Points Required: {this.props.pointValue}</p>
        </div>
        <button className="round" onClick={this.togglePopup.bind(this)}>Edit</button>
        <button className="round" onClick={this.handleClick}>Delete</button>
        {this.state.showPopup ?
          <FormPopup
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
