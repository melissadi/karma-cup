import React from 'react';

class PointsEarned extends React.Component {
  render() {

    let date = new Date(this.props.exchange.created_at);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return (
      <tr>
        <td><p>{this.props.exchange.points_given}</p></td>
        <td><p>{this.props.exchange.store.name}</p></td>
        <td><p>{month}/{dt}/{year}</p></td>
      </tr>
    );
  }
}

export default PointsEarned;
