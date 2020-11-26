import React from 'react';
import './Input.scss';

const Input = (props) => {
    return (
        <div >
          <input className ='Input' size='40' type='text' placeholder='Search Products by Name' name='searchInput' onChange={props.changeHandler}/>  
        </div>
    )
}

export default Input
