import React, { Component } from "react"

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
      .then(userObject => this.setState({ userObject: userObject.user }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    return(
      <div>
       <p>hi from user dashboard</p>
      </div>
    )
  }
}

export default UserDashboard
