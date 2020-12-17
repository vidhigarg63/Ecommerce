import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Button from '../../Components/UI/Button/Button';
import app from "../../Firebase/Firebase";
import './Login.scss';


class Login extends Component {
    state = {
        show : false,
        errorMessage : ''
    }
        
    submitHandler = async(event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;

        if(password.value.length < 6){
            this.setState({ show : true });
        }

        try {
            const response = await app.auth().signInWithEmailAndPassword(email.value, password.value);
            this.props.match.url === '/Login' ? this.props.history.push('/Store') : this.props.history.push(this.props.match.url+'/AddProduct');
            // console.log(response);
            
        } catch (error) {
            console.log(error)
            this.setState({ errorMessage : error.message, show : true });
        }
    }

    SignupHandler = () => {
        this.props.history.push('/Signup')
    }

    render() {
        console.log(this.props)
        return (
            <div className='Login'>
                <div className='form'>
                    <form onSubmit={this.submitHandler}>
                        <legend>Login</legend>
                        
                        {this.state.show ?
                            <p className='error'>{this.state.errorMessage}</p> : null
                        }
                        
                        <section className='LoginSection'>
                            <label>Email</label>
                            <input name='email' type='email' placeholder='Email Address'/>
                        </section>
                        
                        <section className='LoginSection'>
                            <label>Password</label>
                            <input name='password' type='password' placeholder = 'Password' />
                        </section>
                        
                        <section className='ButtonSection'>
                            <Button buttonType='BuyNow' >Login</Button>
                        </section>
                    </form>

                    { this.props.match.url === '/Login' &&
                        <section className='SignupSection'>
                            <p>Don't have an Account</p>
                            <Button buttonType='remove' clicked={this.SignupHandler}>Sign Up</Button>
                        </section>
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(Login)
