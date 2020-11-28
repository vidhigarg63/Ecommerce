import React from 'react'
import Button from '../UI/Button/Button';
import Logo from '../UI/Logo/Logo'
import './CartRow.scss';

function CartRow(props) {
    return (
        <div className='ProductRow'>
            <section className='CartRow'>
                <div className='ProductImage'>
                    <Logo image={props.image} style={props.style} />
                </div>

                <section className= 'AboutCartProduct'>
                    <p style={{marginBottom : '15px'}}>{props.description}</p>

                    {props.quantity > 1 ? 
                        <button className='DeleteButton' onClick={() => props.productChangeHandler(props.id, 'dec')} disabled = {props.quantity === 1}><i className="fas fa-minus-circle"/></button>: null
                    }
                    <span className='QuantitySpan'>{props.quantity}</span>
                    <i className="fas fa-plus-circle" onClick={() => props.productChangeHandler(props.id, 'inc')}></i>

                    <Button className='RemoveButton' buttonType={'remove'} clicked={() => props.removeHandler(props.id)}><i className="far fa-trash-alt"></i> Remove</Button> 
                </section>
                
                <section className='PriceTag'>
                    <span className='PriceSpan'>$ {props.price}</span>
                </section>
            </section>
            
            <section>
            <hr style={{width : '100%', margin: '20px 0px'}}/>
                <article className='FinalPrice'>
                    <h4>Product Total </h4>
                    <h3>$ {props.price * props.quantity}</h3>
                </article>
            <hr style={{width : '100%', marginTop: '20px'}}/>
            </section>
        </div>
    )
}

export default CartRow
