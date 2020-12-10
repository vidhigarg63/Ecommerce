import React from 'react'
import './ShippingAddress.scss'

const ShippingAddress = (props) => {
    return (
        <div className='ShippingAddress'>
            <h4>Ship to</h4>
            <p>{props.name}</p>
            <p>{props.address}</p>
            <p>{props.city}</p>
            <p>{props.country}</p>
        </div>
    )
}

export default ShippingAddress
