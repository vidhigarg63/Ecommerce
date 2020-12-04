import React from 'react'
import './Button.scss'

const Button = (props) => {
    return (
        <section>
            <button className={props.buttonType} onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
        </section>
    )
}

export default Button
