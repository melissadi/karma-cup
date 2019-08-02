import React, { Component } from 'react';
import QrReader from 'react-qr-reader'

class QrScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scannedCustomer: null,
      qrString: ""
    }
    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleScan(data) {
    if (data) {
      const body = JSON.stringify({
        search_string: data
      })
      fetch('/api/v1/users/search.json', {
        method: 'POST',
        body: body,
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(body => this.setState({ scannedCustomer: body }))
      .then(() => {
        let formPayload = {
          points: this.state.scannedCustomer.points + 10
        }
        return fetch(`/api/v1/users/${this.state.scannedCustomer[0].id}`, {
          method: 'PATCH',
          body: JSON.stringify(formPayload),
          credentials: 'same-origin',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(body => this.setState({ scannedCustomer: body }))
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleError(err) {
    console.error(err)
  }

  render(){
    let message
    if (this.state.scannedCustomer){
      message = "Points added!"
    }

    let qrScanner
    if (!this.state.scannedCustomer){
      qrScanner = <QrReader
        delay={500}
        onError={this.handleError}
        onScan={this.handleScan}
        style={{ width: '100%' }}
      />
    }

    return (
      <div>
        {qrScanner}
        {message}
      </div>
    )
  }
}

export default QrScanner;
