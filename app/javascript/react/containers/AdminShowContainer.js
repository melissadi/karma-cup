import React, { Component } from "react"
import { Link } from "react-router-dom"
import SearchBar from '../components/SearchBar'
import CustomerTile from '../components/CustomerTile'
import QrReader from 'react-qr-reader'

class AdminShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminObject: {},
      searchResults: [],
      searchString: "",
      showSearch: false,
      showScanner: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
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
    .then(body => this.setState({ searchResults: body }))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleScan(data) {
    if (data) {
      this.setState({
        qrResult: data
      })
    }
  }

  handleError(err) {
    console.error(err)
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
    if (this.state.searchResults && this.state.showSearch){
      users = this.state.searchResults.map(user => {
        i ++
        return(
          <CustomerTile
            customer={user}
            key={user.id}
            handleClick={this.handleClick}
          />
        )
      })
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
          <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          />
        </div>
    }

    return(
    <div className="return">
      <p>What would you like to do?</p>
      <div className="rows option">
        <Link to={`/admins/${this.props.match.params.id}/stores/${storeId}`}><h2>View {storeName}'s Rewards</h2></Link>
      </div>
      <div className="reward-section rows option">
        <h2>Reward Customer</h2>
        <div className="reward-button">
          <button onClick={this.toggleSearch} className="button round" type="button">Find Customer By Email</button>
        </div>
        {search}
        {users}
        <div className="reward-button">
          <button onClick={this.toggleScanner} className="button round" type="button">Scan Customer Code</button>
        </div>
        {scanner}
        <p>{this.state.qrResult}</p>
      </div>
    </div>
    )
  }
}

export default AdminShowContainer
