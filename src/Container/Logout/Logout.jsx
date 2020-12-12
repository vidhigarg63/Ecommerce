import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import app from '../../Firebase/Firebase';

class Logout extends Component {

    async componentDidMount(){
        try {
          const response = await app.auth().signOut();  
          this.props.history.replace('/Login');
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div>
               <Spinner />
            </div>
        )
    }
}

export default withRouter(Logout)
