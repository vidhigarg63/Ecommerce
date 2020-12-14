import React, {useContext} from 'react'
import NavigationLink from '../NavigationLink/NavigationLink'
import {AuthContext} from '../../../../Context/AuthContext';

const DropDown = (props) => {
    const context = useContext(AuthContext);
    let email = 'No User';
    if(context.currentUser){
        email = context.currentUser.email;
    }

    return (
        <>
            <p><i class="fas fa-user"></i> {email}</p>
            <NavigationLink link = '/Cart/Order' icon='fas fa-history'  title=' Order History' />
            <NavigationLink link = '/Logout' icon='fas fa-sign-out-alt'  title=' Logout' />
        </>
    )
}

export default DropDown
