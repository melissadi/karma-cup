import React, { Component } from "react"
import QRCode from 'qrcode.react'

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObject: {}
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
      </div>
    )
  }
}

export default UserDashboard
