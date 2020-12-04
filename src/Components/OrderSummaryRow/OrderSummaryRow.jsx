import React from 'react'
import './OrderSummaryRow.scss';

const OrderSummaryRow = (props) => {
    return (
        <article className='OrderSummaryRow'>
            <p id={props.class}>{props.children}</p>
            <p id={props.class}> {props.value} </p>
        </article>
    )
}

export default OrderSummaryRow

