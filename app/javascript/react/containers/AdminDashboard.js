import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Link } from "react-router-dom"
import SearchBar from '../components/SearchBar'
import CustomerTile from '../components/CustomerTile'
import AdminRewardsContainer from './AdminRewardsContainer'
import QrScanner from '../components/QrScanner'

class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminObject: {},
      searchedUser: null,
      searchString: "",
      showSearch: false,
      showRewards: false,
      showScanner: false
    }
    this.toggleRewards = this.toggleRewards.bind(this)
    this.toggleScanner = this.toggleScanner.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  toggleScanner(event){
    event.preventDefault()
    this.setState ({ showScanner: !this.state.showScanner })
    this.setState ({ showRewards: false })
    this.setState ({ showSearch: false })
  }

  toggleRewards(event){
    event.preventDefault()
    this.setState ({ showRewards: !this.state.showRewards })
    this.setState ({ showSearch: false })
    this.setState ({ showScanner: false })
  }

  toggleSearch(event){
    event.preventDefault()
    this.setState ({ showSearch: !this.state.showSearch })
    this.setState ({ showScanner: false })
    this.setState ({ showRewards: false })
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
    let name
    let points
    if (this.state.searchedUser != null){
      name = `${this.state.searchedUser[0].first_name} ${this.state.searchedUser[0].last_name}`
      points = this.state.searchedUser[0].points
    }

    let storeId = "#"
    let storeName = ""
    if (this.state.adminObject.store){
      storeId = this.state.adminObject.store.id
      storeName = this.state.adminObject.store.name
    }

    let rewardsSelected
    let rewards
    if (this.state.showRewards){
      rewards =
        <AdminRewardsContainer
          adminId={this.state.adminObject.id}
          storeId={this.state.adminObject.store.id}
        />
      rewardsSelected = "selected"
    }

    let scannerSelected
    let scanner
    if (this.state.showScanner){
      scanner =
        <div className="scanner-section">
          <QrScanner
          />
        </div>
      scannerSelected = "selected"
    }

    let user
    let searchSelected
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
      searchSelected = "selected"
      if (this.state.searchedUser != null){
        user =
          <CustomerTile
            customer={this.state.searchedUser}
            key={this.state.searchedUser.id}
            handleClick={this.handleClick}
          />
      }
    }

    return(
    <div className="admin-dashboard">

      <div className="header">
        <h1>Welcome, {storeName} admin!</h1>
        <h2>What would you like to do?</h2>
      </div>

      <div className="admin-options">
        <div><button type="button" className={searchSelected} onClick={this.toggleSearch}>Reward Customer by Email</button></div>
        <div><button type="button" className={scannerSelected} onClick={this.toggleScanner}>Scan Customer Code</button></div>
        <div><button type="button" className={rewardsSelected} onClick={this.toggleRewards}>Update Store Rewards</button></div>
      </div>

      <div className="drawer">
        {scanner}
        {search}
        {user}
        {rewards}
      </div>

    </div>
    )
  }
}

export default AdminDashboard
