import React from 'react'
import Button from '../UI/Button/Button';
import Logo from '../UI/Logo/Logo'
import './Card.scss';

const Card = (props) => {
    return (
        <div className='Card'>
            <Logo style={props.style} image={props.image} />
            <h3 className='Title'>{props.title}</h3>
            <p className='Description'>{props.description}</p>
            <span className='PriceTag'>$ {props.price}</span>
            <section className='Button'>
                {/* <Button buttonType = 'BuyNow'>Buy Now</Button> */}
                <Button buttonType = 'AddToCart' clicked = {props.addToCartHandler}>Add to Cart</Button>
            </section>
        </div>
    )
}

export default Card
