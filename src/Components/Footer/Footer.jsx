import React from 'react';
import './Footer.scss';
import axios from '../../Axios/Axios';
import emailjs from 'emailjs-com';
const Footer = (props) => {

    const ref = React.createRef()

    const subscribeHandler = async(event) => {
        const email = ref.current.value;
        // console.log(email);
        const subscriber = {
            email : email
        }
        axios.post('/subscribers.json',subscriber);
        const res = await emailjs.send("service_c31x8g4","template_1d8beo7", subscriber, "user_XFd6CZeKoty0lxpJ93veU");
        console.log(res);

    }

    return (
        <div className='Footer'>
            <section className='Newsletter'>
                <h3>Be the first to know</h3>
                <p>Sign up to stay in the loop about the hottest deals, coolest new products, and exclusive sales events.</p>

                <section className='SubscribeField'>
                    <input name='newsletter' placeholder='Email Address' ref={ref} type='text' />
                    <button className='Subscribe' onClick={subscribeHandler}>Subscribe</button>
                </section>

            </section>
        </div>
    )
}

export default Footer
