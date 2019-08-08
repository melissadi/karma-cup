import React, { Component } from "react"
import PointsEarned from '../components/PointsEarned'
import PointsRedeemed from '../components/PointsRedeemed'

class RewardsHistoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: []
    }
  }

  componentDidMount(){
    let userId = this.props.user.id

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
      .then(body => this.setState({ exchanges: body["user"]["exchanges"] }))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  render(){

    let pointsEarned
    let pointsRedeemed
    if (this.state.exchanges != []){
      pointsEarned = this.state.exchanges.map(exchange => {
        if (exchange.points_given > 0){
          return(
            <PointsEarned
              exchange={exchange}
              key={exchange.id}
            />)
        }
      })
      pointsRedeemed = this.state.exchanges.map(exchange => {
        if (exchange.points_redeemed > 0){
          return(
            <PointsRedeemed
              exchange={exchange}
              key={exchange.id}
            />)
        }
      })
    }

    return(
      <div className="points-history">
        <table>
          <thead>
            <tr>
              <th><p>Points Earned</p></th>
              <th><p>Store Name</p></th>
              <th><p>Date Earned</p></th>
            </tr>
          </thead>
          <tbody>
            {pointsEarned}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th><p>Points Redeemed</p></th>
              <th><p>Reward</p></th>
              <th><p>Date Redeemed</p></th>
            </tr>
          </thead>
          <tbody>
            {pointsRedeemed}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RewardsHistoryContainer
