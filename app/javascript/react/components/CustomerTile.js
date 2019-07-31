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
    console.log(formPayload)

    fetch(`/api/v1/users/${this.props.customer.id}`, {
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
    let customer = this.props.customer
    this.setState({ selectedCustomer: customer })
  }

  render(){
    return (
      <div className="customer">
        <p className="columns large-4">{this.props.customer.email}</p>
        <p className="columns large-4">{this.props.customer.first_name} {this.props.customer.last_name}</p>
        <p className="columns large-4">{this.state.selectedCustomer.points} points available</p>
        <button onClick={this.handleClick} className="button small" type="button">Give 10 Points</button>
      </div>
    )
  }
}

export default CustomerTile;
