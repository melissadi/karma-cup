import React, { Component } from "react"
import RewardTile from '../components/RewardTile'

class AdminRewardsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storeObject: {
        rewards: []
      }
    }
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
    if (this.state.storeObject.rewards){
      rewards = this.state.storeObject.rewards.map(reward => {
        return(
          <RewardTile
            key={reward.id}
            name={reward.name}
            description={reward.description}
            pointValue={reward.point_value}
          />
        )
      })
    }

    return(
      <div className="rewards-container">
        {rewards}
      </div>
    )
  }
}

export default AdminRewardsContainer
