import React from 'react'
import Logo from '../UI/Logo/Logo'
import './CartRow.scss';

function CartRow(props) {
    return (
        <section className='CartRow'>
            <Logo image={props.image} style={props.style} />
            <p>{props.description}</p>
            <input type='number' style={{width : '50px', outline : 'none'}} defaultValue={props.quantity} />
            <span>$ {props.price * props.quantity}</span>
        </section>
    )
}

export default CartRow
