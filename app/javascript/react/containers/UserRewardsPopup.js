import React, { Component } from 'react';
import UserRewardsContainer from './UserRewardsContainer'

class UserRewardsPopup extends Component {

  render() {

    return (
      <div className='popup'>
        <div className='popup\_inner reward-container-popup'>
          <h1>Current Offers</h1>
          <UserRewardsContainer
            userPointValue={this.props.userPointValue}
          />
          <button onClick={this.props.closePopup}>Go Back</button>
        </div>
      </div>
    );
  }
}

export default UserRewardsPopup;
