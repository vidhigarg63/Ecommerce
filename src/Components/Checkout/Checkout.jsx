import React from 'react';
import OrderSummaryRow from '../OrderSummaryRow/OrderSummaryRow';
import PromoCode from '../PromoCode/PromoCode';
import Button from '../UI/Button/Button';
import './Checkout.scss';

const Checkout = React.forwardRef((props, ref) => {
    return (
        <div className='CheckoutTotal' >
            <section className='PromoCodeSection'>
                <h3>Promo Code & Coupons</h3>
                <PromoCode ref={ref} clicked = {props.inputHandler} error = {props.error} disable = {props.shouldDisable}/>
            </section>
                <hr style={{margin : '30px 0px'}} />
            <section>
                <h3>Order Summary</h3>
                <OrderSummaryRow class='tax' value={'$'+props.price} >Products Subtotal</OrderSummaryRow>
                <OrderSummaryRow class='tax' value={'$'+props.GST} >GST</OrderSummaryRow>
                <OrderSummaryRow class='tax' value={'$'+props.QST} >QST</OrderSummaryRow>
                <OrderSummaryRow class='tax' value={ '$'+parseFloat(props.QST + props.price + props.GST)} >Products Total</OrderSummaryRow>
                <OrderSummaryRow class='discount' value={props.discount+'%' } >Discount</OrderSummaryRow>
                <OrderSummaryRow class='finalTotal' value={'$'+props.totalPrice} >Total</OrderSummaryRow>
                <Button buttonType='Checkout'>Checkout</Button>
            </section>
        </div>
    )
})

export default Checkout
