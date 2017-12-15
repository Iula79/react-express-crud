import React from 'react';

import IceCream from './IceCream';
import IceCreamForm from './IceCreamForm';

const IceCreamList = (props) => {
  return (
    <div className="icecream-list">
      {props.allIceCreams.map(icecream => {
        return (props.currentlyEditing == icecream.id) 
          ? <IceCreamForm key={icecream.id} icecream={icecream} iceCreamSubmit={props.iceCreamSubmit} />
          : <IceCream key={icecream.id} icecream={icecream} setEditing={props.setEditing} />
      })}
    </div>
  );
};

export default IceCreamList;
