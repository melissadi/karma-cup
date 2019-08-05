import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Link } from "react-router-dom"
import SearchBar from '../components/SearchBar'
import CustomerTile from '../components/CustomerTile'
import AdminRewardsContainer from './AdminRewardsContainer'
import QrScanner from '../components/QrScanner'

class AdminShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminObject: {},
      searchedUser: null,
      searchString: "",
      showSearch: false,
      showScanner: false,
      scannedUser: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleScanner = this.toggleScanner.bind(this)
  }

  toggleSearch(event){
    event.preventDefault()
    if (this.state.showSearch){
      this.setState({ showSearch: false })
    } else {
      this.setState({ showSearch: true })
    }
  }

  toggleScanner(event){
    event.preventDefault()
    if (this.state.showScanner){
      this.setState({ showScanner: false })
    } else {
      this.setState({ showScanner: true })
    }
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
    .then(body => this.setState({ searchedUser: body }))
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

    let user
    if (this.state.searchedUser && this.state.showSearch){
      user =
          <CustomerTile
            customer={this.state.searchedUser}
            key={this.state.searchedUser.id}
            handleClick={this.handleClick}
          />
    }

    let search
    if (this.state.showSearch){
      search =
        <div className="search-section">
          <SearchBar
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            searchString={this.state.searchString}
          />
        </div>
    }

    let scanner
    if (this.state.showScanner){
      scanner =
        <div className="scanner-section">
          <QrScanner
          />
        </div>
    }

    let name
    let points
    if (this.state.searchedUser){
      name = `${this.state.searchedUser[0].first_name} ${this.state.searchedUser[0].last_name}`
      points = this.state.searchedUser[0].points
    }

    let rewardsLink = <h2>View Rewards</h2>
    if (this.state.adminObject.store){
      rewardsLink = `${this.state.adminObject.id}/stores/${this.state.adminObject.store.id}/rewards`
    }

    return(
    <div className="return">
      <p>What would you like to do?</p>
      <div className="admin-section rows option">
        <Link to={rewardsLink}><h2>View Rewards</h2></Link>
      </div>
      <div className="admin-section rows option">
        <h2>Reward Customer</h2>
        <div className="reward-button">
          <button onClick={this.toggleSearch} className="button round" type="button">Find Customer By Email</button>
        </div>
        {search}
        {user}
        <div className="reward-button">
          <button onClick={this.toggleScanner} className="button round" type="button">Scan Customer Code</button>
        </div>
        {scanner}

      </div>
    </div>
    )
  }
}

export default AdminShowContainer
