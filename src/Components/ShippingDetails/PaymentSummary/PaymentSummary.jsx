import React from 'react';
import './PaymentSummary.scss';

const PaymentSummary = (props) => {
    return (
        <div className='PaymentSummary'>
            <h4>Paid With</h4>
            <section className='Payment'>
                <p>Paypal Balance</p>
                <p>{props.pricePaid}</p>
            </section>
        </div>
    )
}

export default PaymentSummary
