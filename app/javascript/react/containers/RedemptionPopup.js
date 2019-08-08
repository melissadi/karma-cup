import React from 'react';

class RedemptionPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    }

  handleClick(event){
    event.preventDefault()
    this.props.redeemPoints(this.props.reward)
    this.props.closePopup()
  }

  render() {

    return (
      <div className='popup'>
        <div className='popup\_inner redemption'>
          <div className="popup-content">
            <h1>{this.props.text}</h1>
            <h2>Would you like to redeem {this.props.requiredPoints} points?</h2>
            <div className="popup-options">
              <button onClick={this.handleClick} type="button" className="popup-button">Redeem</button>
              <button onClick={this.props.closePopup} className="popup-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RedemptionPopup;
