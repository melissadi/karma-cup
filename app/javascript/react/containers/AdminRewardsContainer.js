import React, { Component } from "react"
import RewardTile from '../components/RewardTile'
import Popup from '../components/Popup'

class AdminRewardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storeObject: {
        rewards: []
      },
      selectedReward: {},
      showPopup: false
    }
    this.updateRewards = this.updateRewards.bind(this)
    this.selectReward = this.selectReward.bind(this)
  }

  togglePopup(){
    this.setState({ showPopup: !this.state.showPopup })
  }

  updateRewards(newReward){
    this.setState ({ storeObject: {
        rewards: this.state.storeObject.rewards.concat(newReward)
      }
    })
    this.togglePopup()
  }

  selectReward(reward){
    this.setState({ selectedReward: reward })
  }

  componentDidMount(){
    let adminId = this.props.match.params.admin_id
    let storeId = this.props.match.params.store_id

    fetch(`/api/v1/admins/${adminId}/stores/${storeId}`)
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
      .then(body => this.setState({ storeObject: body["store"] }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){
    let rewards
    if (this.state.storeObject.rewards != []){
      rewards = this.state.storeObject.rewards.map(reward => {
        return(
            <RewardTile
              key={reward.id}
              name={reward.name}
              description={reward.description}
              pointValue={reward.point_value}
              rewardId={reward.id}
              storeId={this.state.storeObject.id}
              selectReward={this.selectReward}
            />
        )
      })
    }

    return(
      <div className="rewards-container">
        {rewards}
        <button onClick={this.togglePopup.bind(this)}>Add Reward</button>
        {this.state.showPopup ?
        <Popup
          text="Add A Reward"
          closePopup={this.togglePopup.bind(this)}
          storeId={this.state.storeObject.id}
          updateRewards={this.updateRewards}
        />
        : null
        }
      </div>
    )
  }
}

export default AdminRewardsContainer
