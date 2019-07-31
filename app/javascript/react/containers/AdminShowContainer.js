import React, { Component } from "react"
import { Link } from "react-router-dom"
import SearchBar from '../components/SearchBar'

class AdminShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminObject: {},
      searchResults: [],
      searchString: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = JSON.stringify({
      search_string: this.state.searchString
    })
    fetch('/api/v1/users/search.json', {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(body => this.setState({ searchResults: body }))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount(){
    let adminId = this.props.match.params.id

    fetch(`/api/v1/admins/${adminId}`)
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
      .then(adminObject => this.setState({ adminObject: adminObject.admin }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let storeId = "#"
    let storeName = ""
    if (this.state.adminObject.store){
      storeId = this.state.adminObject.store.id
      storeName = this.state.adminObject.store.name
    }

    let users
    let i = 0
    if (this.state.searchResults){
      users = this.state.searchResults.map(user => {
        i ++
        return(
          <p key={i}>{user.email}</p>
        )
      })
    }

      return(
      <div className="return">
        <p>What would you like to do?</p>
        <div className="columns large-6 option">
          <Link to={`/admins/${this.props.match.params.id}/stores/${storeId}`}><h2>View {storeName}'s Rewards</h2></Link>
        </div>
        <div className="columns large-6 option">
          <h2>Reward Customer</h2>
          <SearchBar
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          {users}
        </div>
      </div>
    )
  }
}

export default AdminShowContainer
