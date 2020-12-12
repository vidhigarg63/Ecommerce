import React from 'react'
import NavigationLink from './NavigationLink/NavigationLink'
import './NavigationList.scss'

const NavigationList = ( props ) => {
    return (
        <ul className = 'NavList'>
            <NavigationLink link = '/Store' ><i className="fas fa-store"></i> Store</NavigationLink>
            <NavigationLink link = '/Cart' ><i className="fas fa-shopping-cart"></i> Cart </NavigationLink>
            <NavigationLink link = '/Logout' ><i className="fas fa-user-circle"></i> Logout </NavigationLink>
        </ul>
    )
}

export default NavigationList
