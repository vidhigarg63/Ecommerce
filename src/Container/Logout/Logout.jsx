import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import app from '../../Firebase/Firebase'

class Logout extends Component {
    componentDidMount(){
        app.auth().signOut();
        this.props.history.push('/Login')
    }
    render() {
        return (
            <div>
                <p>logout ...</p> 
            </div>
        )
    }
}

export default withRouter(Logout)
