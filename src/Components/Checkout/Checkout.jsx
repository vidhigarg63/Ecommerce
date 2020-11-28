import React from 'react';
import OrderSummaryRow from '../OrderSummaryRow/OrderSummaryRow';
import Button from '../UI/Button/Button';
import './Checkout.scss';

const Checkout = (props) => {
    return (
        <section className='CheckoutTotal' >
            <h3>Order Summary</h3>

            <OrderSummaryRow class='tax' value={props.price} >Products Subtotal</OrderSummaryRow>
            <OrderSummaryRow class='tax' value={props.GST} >GST</OrderSummaryRow>
            <OrderSummaryRow class='tax' value={props.QST} >QST</OrderSummaryRow>
            <OrderSummaryRow class='finalTotal' value={props.totalPrice} >Total</OrderSummaryRow>
            
            <Button buttonType='Checkout'>Checkout</Button>
    </section>
    )
}

export default Checkout
