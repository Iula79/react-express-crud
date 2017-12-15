import React from 'react';


const IceCream = (props) => {
  return (
    <div className="ic-inlist">
      <img src={props.icecream.url} alt={props.icecream.flavor} />
      <h2>{props.icecream.flavor}</h2>
      <div className="info">
        <h4 className="brand">{props.icecream.brand}</h4>
        <p>{props.icecream.description}</p>
      </div>
      <p className="rating">Rating: {props.icecream.rating}</p>
      <span className="clickme" onClick={() => props.setEditing(props.icecream.id)}>Edit</span>
    </div>
  )
}

export default IceCream;
