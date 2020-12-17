import React, { Suspense,  Component } from 'react';
import './Layout.scss'
import Toolbar from '../../Components/Navigation/Toolbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import Footer from '../../Components/Footer/Footer';
import PrivateRoute from '../../PrivateRoutes/PrivateRoute'

// Using Code Spilitng to load route in a lazy fashion
const LazyStore = React.lazy( () => import('../../Container/Store/Store'));
const LazyCart = React.lazy( () => import('../Cart/Cart'));
const LazyPaypal = React.lazy( () => import('../../Components/Paypal/Paypal'));
const LazyOrder = React.lazy( () => import('../../Container/Shipping/Shipping' ));
const LazyNotFound = React.lazy( () => import('../../Components/Error/NotFound'));
const LazySignup = React.lazy( () => import('../Signup/Signup'));
const LazyLogin = React.lazy( () => import('../Login/Login'));
const LazyLogout = React.lazy( () => import('../Logout/Logout'));
const LazyAddProduct = React.lazy( () => import('../Admin/AddProduct'));


//! basic working of application for the state management (Source of truth).
class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search : '',
        }
    }
    changeHandler = (event) => {
        let prevState = {
            ...this.state
        }
        prevState.search = event.target.value;
        this.setState({ search: prevState.search });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Toolbar changeHandler = {(event) =>this.changeHandler(event)} /> 
                    <Switch>
                        <PrivateRoute exact path='/Store' search={this.state.search} component={LazyStore} />
                        <PrivateRoute exact path='/Cart/Order' component={LazyOrder} />
                        <PrivateRoute path='/Cart' component={LazyCart} />
                        <PrivateRoute exact path='/Checkout' component={LazyPaypal} />

                        <Route exact path='/Signup' render = { () => (
                            <Suspense fallback = {<Spinner />}>
                                <LazySignup />
                            </Suspense>
                        )}/>

                        <Route exact path='/Login' render = { () => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyLogin />
                            </Suspense>
                        )}/>

                        <Route path='/Admin/AddProduct' render = { () => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyAddProduct />
                            </Suspense>
                        )}/>
                        
                        <Route exact path='/Admin' render = { () => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyLogin />
                            </Suspense>
                        )}/>
                        
                        <Route exact path='/Logout' render = { () => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyLogout />
                            </Suspense>
                        )}/>

                        <Redirect exact from='/' to='/Signup'/>
                        
                        <Route path='' render={(props) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyNotFound>
                                    <h1><i className="fas fa-bug" style={{marginRight : '20px'}}></i>Error 404</h1>
                                    <p>We can't find the page you are looking for</p>
                                </LazyNotFound>
                            </Suspense>
                        )} />
                    </Switch>
                    <Footer/>
                </BrowserRouter>         
            </div>
        )
    }
}

export default Layout
