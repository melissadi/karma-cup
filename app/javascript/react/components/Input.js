import React from 'react';

const Input = (props) => {

  return(
    <div className="input">
      <label>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      />
    </div>

  )
}

export default Input;
