import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import Button from '../../Components/UI/Button/Button';
import app from "../../Firebase/Firebase";
import './Signup.scss';


class Signup extends Component {
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
            const response = await app.auth().createUserWithEmailAndPassword(email.value,password.value);
            this.props.history.push('./Login')
            console.log(response);
            
        } catch (error) {
            console.log(error)
            this.setState({ errorMessage : error.message, show : true });
        }
    }

    LoginHandler = () => {
        console.log("LOGIN")
        this.props.history.push('/Login');
    }

    render() {
        return (
            <div className='Signup'>
                <div className='form'>
                    <form onSubmit={this.submitHandler}>
                        <legend>Sign Up</legend>
                        
                        {this.state.show ?
                            <p className='error'>{this.state.errorMessage}</p> : null
                        }

                        <section className='SignupSection'>
                            <label>Email</label>
                            <input name='email' type='email' placeholder='Email Address'/>
                        </section>
                        <section className='SignupSection'>
                            <label>Password</label>
                            <input name='password' type='password' placeholder = 'Password' />
                        </section>

                        <section className='ButtonSection'>
                            <Button buttonType='BuyNow' >Sign up</Button>
                        </section>
                    </form>
                    <section className='LoginSection'>
                        <p>Already have a Account?</p> 
                        <Button buttonType='remove' clicked={this.LoginHandler} >Login</Button>
                    </section>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup)
