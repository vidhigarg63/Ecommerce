import React from 'react'
import Button from '../UI/Button/Button'
import './PromoCode.scss';

const PromoCode = React.forwardRef((props, ref) => {

    let classes = ['input'];
    if(props.error){
        classes.push('inputError');
    }

    return (
        <div>        
            <section className='PromoCode'>
                <input className={classes.join(' ')} ref={ref} type='text' name='promoInput' placeholder='Enter your promo code'/>
                <Button buttonType='BuyNow' clicked={props.clicked} disable = {props.disable}>Apply</Button>
            </section>

            {props.error ? <span className='Error'>Enter a valid discount code or gift card</span> : null}
        </div>
    )
});

export default PromoCode
