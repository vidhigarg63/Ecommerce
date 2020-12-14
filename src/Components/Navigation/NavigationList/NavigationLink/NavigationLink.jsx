import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './NavigationLink.scss'

const NavigationLink = (props) => {
    return (
        <>
            <NavLink exact to = {props.link} onClick={props.enter}>
                <li className = 'Navitem'><i className={props.icon}></i>{props.title}<i className={props.iconBack}></i></li>
            </NavLink>

            {props.show && props.children}
        </>
    )
}

NavigationLink.propTypes = {
    link : PropTypes.string,
}

export default NavigationLink

