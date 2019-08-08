import React, { Component } from "react"
import QrCode from '../components/QrCode'
import UserRewardsContainer from './UserRewardsContainer'

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObject: {},
      selectQrCode: false,
      selectRewards: false,
      selectStore: false,
    }
    this.toggleQrCode = this.toggleQrCode.bind(this)
    this.toggleRewards = this.toggleRewards.bind(this)
    this.redeemPoints = this.redeemPoints.bind(this)
  }

  redeemPoints(pointsToRedeem) {
    let formPayload = JSON.stringify({
      points: this.state.userObject.points - pointsToRedeem
    })
    fetch(`/api/v1/users/${this.state.userObject.id}`, {
      method: 'PATCH',
      body: formPayload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.setState({ userObject: body }))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  toggleRewards(event) {
    this.setState({ selectRewards: !this.state.selectRewards})
    this.setState({ selectQrCode: false })
  }

  toggleQrCode(event) {
    this.setState({ selectQrCode: !this.state.selectQrCode})
    this.setState({ selectRewards: false })
  }

  componentDidMount() {
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

  render() {

    let pointsStats
    if (this.state.userObject.points && this.state.userObject.points > 0){
      pointsStats = `You have ${this.state.userObject.points} points.`
    } else {
      pointsStats = `You don't have any points at the moment. Remember your cup to earn some today!`
    }

    let qrcode
    let qrSelected
    if (this.state.selectQrCode) {
      qrcode =
        <QrCode
          userEmail={this.state.userObject.email}
        />
      qrSelected = "selected"
    }

    let rewards
    let rewardsSelected
    if (this.state.selectRewards) {
      rewards =
        <UserRewardsContainer
          userPoints={this.state.userObject.points}
          redeemPoints={this.redeemPoints}
        />
      rewardsSelected = "selected"
    }

    return(
      <div className="user-dashboard">
        <div className="header">
          <h1>Welcome, {this.state.userObject.first_name}. {pointsStats}</h1>
        </div>
        <div className="user-options">
          <div><button type="button" className={qrSelected} onClick={this.toggleQrCode}>My QR Code</button></div>
          <div><button type="button" className={rewardsSelected} onClick={this.toggleRewards}>Rewards</button></div>
          <div><button>Cafes Near Me</button></div>
        </div>
        <div className="drawer">
          {qrcode}
          {rewards}
        </div>
      </div>
    )
  }
}

export default UserDashboard
