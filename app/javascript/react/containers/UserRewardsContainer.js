import React, { Component } from "react"
import UserRewardTile from '../components/UserRewardTile'

class UserRewardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRewards: []
      }
    }

  componentDidMount(){

    fetch(`/api/v1/rewards`)
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
      .then(body => this.setState({ allRewards: body["rewards"] }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){

    let rewards
    if (this.state.allRewards != []){
      rewards = this.state.allRewards.map(reward => {
        return (
          <UserRewardTile
            key={reward.id}
            reward={reward}
            store={reward.store}
            userPointValue={this.props.userPointValue}
          />
        )
      })
    }

    return(
      <div className="rewardsContainerInPopup">
        {rewards}
      </div>
    )
  }
}

export default UserRewardsContainer
