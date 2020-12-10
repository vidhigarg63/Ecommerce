import React from 'react'
import PaymentSummary from './PaymentSummary/PaymentSummary';
import ShippingAddress from './shippingAddress/ShippingAddress';
import './ShippingDetails.scss';

const ShippingDetails = (props) => {
    return (
        <div className='PaymentSummary'>
            <PaymentSummary pricePaid = {props.price} />
            <ShippingAddress 
                name = {props.name}
                address = {props.address}
                city = {props.city}
                country = {props.country}
            />
            
        </div>
    )
}

export default ShippingDetails
