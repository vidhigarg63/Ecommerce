import React, { Suspense,  Component } from 'react';
import './Layout.scss'
import Toolbar from '../../Components/Navigation/Toolbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import Footer from '../../Components/Footer/Footer';

const LazyStore = React.lazy( () => import('../../Container/Store/Store'));
const LazyCart = React.lazy( () => import('../Cart/Cart'));

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
                        <Route path='/Store' render = { (props) => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyStore {...props} search={this.state.search}/>
                            </Suspense>
                        )}/>
                        <Route path='/Cart' render = { (props) => (
                            <Suspense fallback = {<Spinner />}>
                                <LazyCart {...props} />
                            </Suspense>
                        )}/>
                        <Redirect exact from='/' to='/Store'/>
                    </Switch>
                    <Footer/>
            </BrowserRouter>         
            </div>
        )
    }
}

export default Layout
