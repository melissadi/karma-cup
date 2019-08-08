import React, { Component } from 'react';

class CustomerTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: {
        points: 0
      },
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    event.preventDefault()

    let formPayload = {
      points: this.state.selectedCustomer.points + 10
    }

    fetch(`/api/v1/users/${this.props.customer[0].id}`, {
      method: 'PATCH',
      body: JSON.stringify(formPayload),
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.setState({ selectedCustomer: body }))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    let customer = this.props.customer[0]
    this.setState({ selectedCustomer: customer })
  }

  render(){
    return (
      <div className="customer">
        <p>{this.props.customer[0].first_name} {this.props.customer[0].last_name} ({this.props.customer[0].email})</p>
        <p>{this.state.selectedCustomer.points} points available</p>
        <div>
          <button onClick={this.handleClick} className="button small add-points" type="button">Give 10 Points</button>
        </div>
      </div>
    )
  }
}

export default CustomerTile;
