import React from 'react'
import Logo from '../UI/Logo/Logo'
import './ShippingCard.scss';

const ShippingCard = (props) => {
    return (
        <div className='ShippingCardDetail'>
            <Logo image={props.image} style={{width : '80px'}}/>
            <p>{props.description}</p>
            <p>{props.quantity}</p>
            <p>${props.price}</p>
        </div>
    )
}
export default ShippingCard