import React from 'react'
import './Backdrop.scss'

const Backdrop = (props) => {
    return (
        props.show ? <div className = 'Backdrop'> {props.children} </div> : null
    )
}

export default Backdrop
