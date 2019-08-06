import React from 'react';
import RewardFormContainer from '../containers/RewardFormContainer'

class FormPopup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup\_inner reward-form-popup'>
          <h1>{this.props.text}</h1>
          <RewardFormContainer
            storeId={this.props.storeId}
            updateRewards={this.props.updateRewards}
            rewardId={this.props.rewardId}
            selectReward={this.props.selectReward}
            closePopup={this.props.closePopup}
          />
          <button onClick={this.props.closePopup}>Go Back</button>
        </div>
      </div>
    );
  }
}

export default FormPopup;
