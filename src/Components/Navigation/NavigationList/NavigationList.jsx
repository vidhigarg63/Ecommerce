import React, { useState } from 'react'
import DropDown from './DropDown/DropDown'
import NavigationLink from './NavigationLink/NavigationLink'
import './NavigationList.scss'


const NavigationList = ( props ) => {

    const [show, setShow] = useState(false)
    const showDropDown = () => {
        setShow(!show);
    }

    return (
        <ul className = 'NavList'>
            <NavigationLink link = '/Store' icon='fas fa-store' title='Store' />
            <NavigationLink link = '/Cart' icon='fas fa-shopping-cart' title='Cart' />
            
            <NavigationLink link = '#' iconBack='fas fa-caret-down' show={show} title='My Account ' enter={showDropDown}>
                <section className='DropDownMenu'>
                    <DropDown enter={showDropDown} />
                </section>
            </NavigationLink>
        </ul>
    )
}

export default NavigationList
