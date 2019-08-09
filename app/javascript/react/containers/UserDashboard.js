import React, { Component } from "react"
import QrCode from '../components/QrCode'
import UserRewardsContainer from './UserRewardsContainer'
import RewardsHistoryContainer from './RewardsHistoryContainer'

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObject: {},
      rewardObject: {},
      selectQrCode: false,
      selectRewards: false,
      selectHistory: false,
      selectStore: false
    }
    this.toggleQrCode = this.toggleQrCode.bind(this)
    this.toggleRewards = this.toggleRewards.bind(this)
    this.toggleHistory = this.toggleHistory.bind(this)
    this.redeemPoints = this.redeemPoints.bind(this)
  }

  redeemPoints(rewardObject) {
    let reward = rewardObject
    let user = this.state.userObject
    let formPayload = JSON.stringify({
      points: this.state.userObject.points - rewardObject.point_value
    })
    fetch(`/api/v1/users/${this.state.userObject.id}`, {
      method: 'PATCH',
      body: formPayload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.setState({ userObject: body.user }))
    .then(() => {
      let formPayload = {
        user_id: user.id,
        store_id: reward.store.id,
        reward_id: reward.id,
        points_redeemed: reward.point_value
      }
      return fetch(`/api/v1/exchanges`, {
        method: 'POST',
        body: JSON.stringify(formPayload),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(body => this.setState({ rewardObject: body }))
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  toggleRewards(event) {
    this.setState({ selectRewards: true})
    this.setState({ selectQrCode: false })
    this.setState({ selectHistory: false })
  }

  toggleQrCode(event) {
    this.setState({ selectQrCode: true})
    this.setState({ selectRewards: false })
    this.setState({ selectHistory: false })
  }

  toggleHistory(event) {
    this.setState({ selectHistory: true})
    this.setState({ selectRewards: false })
    this.setState({ selectQrCode: false })
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
      .then(userObject => this.setState({
        userObject: userObject["user"],
        selectQrCode: true
      }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let pointsStats
    if (this.state.userObject.points && this.state.userObject.points > 0){
      pointsStats = `You have ${this.state.userObject.points} points.`
    } else {
      pointsStats = `You don't have any points at the moment. Remember your cup to earn some today!`
    }

    let cupsSaved = 0
    let cupsStats
    if (this.state.userObject.exchanges){
      this.state.userObject.exchanges.forEach(exchange => {
        if (exchange.points_given > 0){
          cupsSaved = cupsSaved + 1
        }
      })
      if (cupsSaved > 0){
        cupsStats = `You've saved ${cupsSaved} cups!`
      }
    } else {
      cupsStats = "Remember to bring your cup to earn points!"
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
          userId={this.state.userObject.id}
        />
      rewardsSelected = "selected"
    }

    let history
    let historySelected
    if (this.state.selectHistory) {
      history =
        <RewardsHistoryContainer
          user={this.state.userObject}
        />
      historySelected = "selected"
    }

    return(
      <div className="user-dashboard">
        <div className="header">
          <h1>Welcome, {this.state.userObject.first_name}</h1>
          <h2>{pointsStats}</h2>
          <h2>{cupsStats}</h2>
        </div>
        <div className="user-options">
          <div><button type="button" id="dashboard-button" className={qrSelected} onClick={this.toggleQrCode}>My QR Code</button></div>
          <div><button type="button" id="dashboard-button" className={rewardsSelected} onClick={this.toggleRewards}>Current Offers</button></div>
          <div><button type="button" id="dashboard-button" className={historySelected} onClick={this.toggleHistory}>My Rewards History</button></div>
        </div>
        <div className="drawer">
          {qrcode}
          {rewards}
          {history}
        </div>
      </div>
    )
  }
}

export default UserDashboard
