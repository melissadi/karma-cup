import React from 'react';

const SearchBar = (props) => {

  return(
    <form className="search" onSubmit={props.handleSubmit}>
      <label>Enter Customer Email:</label>
      <div className="search-field">
        <input type="text" name="searchString" value={props.searchString} onChange={props.handleChange} />
        <input className="button" type="submit" value="Search"/>
      </div>
    </form>
  )
}

export default SearchBar;
