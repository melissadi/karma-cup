import React, { Component } from "react"
import Input from '../components/Input'

class RewardFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      points: 0,
      storeId: this.props.storeId,
      newReward: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.addReward = this.addReward.bind(this)
    this.editReward = this.editReward.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange(event){
    let target = event.target
    let value = target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  handleEdit(reward){
    this.props.closePopup()
    this.props.selectReward(reward)
  }

  addReward(event){
    event.preventDefault()
    let formPayload = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      point_value: this.state.points,
      store_id: this.state.storeId
    })
    fetch(`/api/v1/stores/${this.state.storeId}/rewards`, {
      method: 'POST',
      body: formPayload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.props.updateRewards(body["reward"]))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  editReward(event){
    event.preventDefault()

    let formPayload = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      point_value: this.state.points,
      store_id: this.state.storeId
    })
    fetch(`/api/v1/stores/${this.state.storeId}/rewards/${this.props.rewardId}`, {
      method: 'PATCH',
      body: formPayload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.handleEdit(body["reward"]))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    if (this.props.rewardId){
      let rewardId = this.props.rewardId
      let storeId = this.props.storeId

      fetch(`/api/v1/stores/${storeId}/rewards/${rewardId}`)
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
        .then(body => this.setState({
          name: body["reward"]["name"],
          description: body["reward"]["description"],
          points: body["reward"]["point_value"],
          newReward: false
        }))
        .catch(error => console.error(`Error in fetch: ${error.message}`));
      }
    }

  render(){

    let value
    let handleSubmit
    if (this.state.newReward){
      value = "Create"
      handleSubmit = this.addReward
    } else {
      value = "Save"
      handleSubmit = this.editReward
    }


    return(
      <form id="rewards-forms" onSubmit={handleSubmit}>
        <Input
          name="name"
          id="name"
          type="text"
          handleChange={this.handleChange}
          value={this.state.name}
          label="Name"
        />
        <Input
          name="description"
          id="description"
          type="text"
          handleChange={this.handleChange}
          value={this.state.description}
          label="Description"
        />
        <Input
          name="points"
          id="points"
          type="text"
          handleChange={this.handleChange}
          value={this.state.points}
          label="Points Required"
        />
        <div className="form-buttons">
          <input type="submit" className="form-button" value={value}/>
          <button type="button" className="form-button" onClick={this.props.closePopup}>Go Back</button>
        </div>
      </form>
    )
  }
}

export default RewardFormContainer
