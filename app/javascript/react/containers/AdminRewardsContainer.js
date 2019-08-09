import React, { Component } from "react"
import RewardTile from '../components/RewardTile'
import FormPopup from '../components/FormPopup'
import { Link } from "react-router-dom"

class AdminRewardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storeObject: {
        rewards: []
      },
      showPopup: false
    }
    this.updateRewards = this.updateRewards.bind(this)
    this.selectReward = this.selectReward.bind(this)
    this.deleteReward = this.deleteReward.bind(this)
  }

  togglePopup(){
    this.setState({ showPopup: !this.state.showPopup })
  }

  updateRewards(newReward){
    this.setState ({
      storeObject: {
        ...this.state.storeObject,
        rewards: this.state.storeObject.rewards.concat(newReward)
      }
    })
    this.togglePopup()
  }

  selectReward(editedReward){
    this.setState({
      storeObject: {
        ...this.state.storeObject,
        rewards: this.state.storeObject.rewards.map(reward => {
          if (reward.id === editedReward.id){
            return editedReward
          } else {
            return reward
          }
        })
      }
    })
  }

  removeDeletedReward(updatedRewards){
    this.setState({
      storeObject: {
        ...this.state.storeObject,
        rewards: updatedRewards
          }
      })
  }


  deleteReward(rewardToDelete){
    let body = JSON.stringify(rewardToDelete)
    fetch (`/api/v1/stores/${this.state.storeObject.id}/rewards/${rewardToDelete.id}`, {
      method: 'DELETE',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(body => this.removeDeletedReward(body["rewards"]))
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount(){
    let adminId = this.props.adminId
    let storeId = this.props.storeId

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
    let storeId
    if (this.state.storeObject.rewards != []){
      storeId = this.state.storeObject.id
      rewards = this.state.storeObject.rewards.map(reward => {
        return(
            <RewardTile
              key={reward.id}
              name={reward.name}
              description={reward.description}
              pointValue={reward.point_value}
              rewardId={reward.id}
              reward={reward}
              storeId={storeId}
              selectReward={this.selectReward}
              deleteReward={this.deleteReward}
            />
        )
      })
    }
    let adminLink
    if (this.state.storeObject.admins){
      adminLink = `/admins/${this.state.storeObject.admins[0].id}`
    } else {
      adminLink = `#`
    }

    return(
      <div className="rewards-page">
        <div className="admin-view">
          <div className="new rewards-tile">
            <button className="round" onClick={this.togglePopup.bind(this)}>Add New Reward</button>
          </div>
          {rewards}
        </div>
        {this.state.showPopup ?
        <FormPopup
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
