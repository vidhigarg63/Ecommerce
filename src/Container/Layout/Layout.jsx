import React, { Suspense,  Component } from 'react';
import './Layout.scss'
import Toolbar from '../../Components/Navigation/Toolbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import Footer from '../../Components/Footer/Footer';

// Using Code Spilitng to load route in a lazy fashion
const LazyStore = React.lazy( () => import('../../Container/Store/Store'));
const LazyCart = React.lazy( () => import('../Cart/Cart'));
const LazyPaypal = React.lazy( () => import('../../Components/Paypal/Paypal'));
const LazyOrder = React.lazy( () => import('../../Container/Shipping/Shipping' ));
const LazyNotFound = React.lazy( () => import('../../Components/Error/NotFound'));

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
                        <Route exact path= '/Cart/Order' render={ (props) => (
                            <Suspense fallback={<Spinner />}>
                                <LazyOrder {...props} />
                            </Suspense>
                        )} ></Route>

                        <Route exact path='/Store' render = { (props) => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyStore {...props} search={this.state.search}/>
                            </Suspense>
                        )}/>

                        <Route exact path='/Cart' render = { (props) => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyCart {...props} />
                            </Suspense>
                        )}/>

                        <Route exact path='/Checkout' render = { (props) => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyPaypal {...props} />
                            </Suspense>
                        )}/>

                        <Redirect exact from='/' to='/Store'/>
                        
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
