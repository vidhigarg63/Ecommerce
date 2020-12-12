import React, {Suspense, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom';
import Spinner from '../Components/UI/Spinner/Spinner';
import {AuthContext} from '../Context/AuthContext';

const PrivateRoute = ({component : Component, search , ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log({...rest})
    return (
        currentUser ?
        <Route {...rest} render={ (props) => (
            <Suspense fallback={<Spinner/>}>
                <Component search={search} {...props} />
            </Suspense>
        )}/> : <Redirect to='/Login' />
    )
}

export default PrivateRoute
