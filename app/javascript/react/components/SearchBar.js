import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>Customer Lookup</label>
        <input type="text" name="searchString" value={this.state.searchString} onChange={this.props.handleChange} />
        <input type="submit" value="Search"/>
      </form>
    )
  }
}

export default SearchBar;
