import React, { Component } from "react"
import QRCode from 'qrcode.react'
import UserRewardsContainer from './UserRewardsContainer'

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObject: {},
      showRewards: false
    }
    this.toggleRewards = this.toggleRewards.bind(this)
  }

  toggleRewards(event){
    event.preventDefault()
    if (this.state.showRewards){
      this.setState({ showRewards: false })
    } else {
      this.setState({ showRewards: true })
    }
  }

  componentDidMount(){
    let userId = this.props.match.params.id

    fetch(`/api/v1/users/${userId}`)
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(userObject => this.setState({ userObject: userObject }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let pointsStats
    if (this.state.userObject.points && this.state.userObject.points > 0){
      pointsStats = `You have ${this.state.userObject.points} points`
    } else {
      pointsStats = `You don't have any points at the moment. Remember your cup to earn some today!`
    }

    let rewards
    if (this.state.showRewards){
      rewards =
        <UserRewardsContainer
          userPointValue={this.state.userObject.points}
        />
    }

    let qrcode
    if (this.state.userObject.email){
      qrcode =
        <QRCode
          value={this.state.userObject.email}
          size={300}
          fgColor="#1B7B34"
        />
    }

    return(
      <div className="user-dashboard">
       <div className="first-section">
        <div className="text">
          <p>Welcome, {this.state.userObject.first_name}.</p>
          <p>{pointsStats}</p>
        </div>
        <div className="qr-code">
          <p>Your QR Code:</p>
          {qrcode}
        </div>
       </div>
       <div className="second-section">
         <button onClick={this.toggleRewards} className="button round" type="button">View Rewards</button>
         <button onClick={this.toggleRewards} className="button round" type="button">Point History</button>
         <button onClick={this.toggleRewards} className="button round" type="button">Find Store</button>
         {rewards}
       </div>
      </div>
    )
  }
}

export default UserDashboard
