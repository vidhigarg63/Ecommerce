import React, { Component } from 'react'
import Navigation from '../../Components/Navigation/NavigationList/NavigationList'
import Input from '../../Components/UI/Input/Input';
import Logo from '../../Components/UI/Logo/Logo';
import LogoImage from '../../assets/Images/favicon.png';

class Toolbar extends Component{

    render(){
        return (
            <div>
                <div>
                    <header className='Header'>
                        <section className='Logo'>
                            <Logo image={LogoImage} style={{width : '40px'}}/>
                        </section>
                        <section className='InputFeild'>
                            <Input changeHandler = {this.props.changeHandler}/>
                        </section>
                        <nav className='Navigation' >
                            <Navigation  />
                        </nav>
                    </header>                
                </div>
            </div>
        )
    }
}

export default Toolbar
