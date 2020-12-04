import React from 'react'
import NavigationLink from './NavigationLink/NavigationLink'
import './NavigationList.scss'

const NavigationList = ( props ) => {
    return (
        <ul className = 'NavList'>
            <NavigationLink link = '/Store' ><i className="fas fa-store"></i> Store</NavigationLink>
            <NavigationLink link = '/Cart' ><i className="fas fa-shopping-cart"></i> Cart </NavigationLink>
            {/* <NavigationLink link = '/Account' ><i className="fas fa-user-circle"></i> My Account</NavigationLink> */}
        </ul>
    )
}

export default NavigationList
