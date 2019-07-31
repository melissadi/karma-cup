import React from 'react';

const SearchBar = (props) => {

  return(
    <form className="search" onSubmit={props.handleSubmit}>
      <label>Enter Customer Email:</label>
      <input type="text" name="searchString" value={props.searchString} onChange={props.handleChange} />
      <input className="button round" type="submit" value="Search"/>
    </form>
  )
}

export default SearchBar;
