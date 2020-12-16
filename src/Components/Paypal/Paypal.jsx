import React from 'react'
import {withRouter } from 'react-router-dom';
import './PayPal.scss'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop';
import axios from '../../Axios/Axios';
import {AuthContext} from '../../Context/AuthContext'
import emailjs from 'emailjs-com';
class Paypal extends React.Component{
  state = {
    loading : false
  }
  paypal = React.createRef()
  static contextType = AuthContext;
  
  componentDidMount(){
    const {email} = this.context.currentUser;
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: email,
                amount: {
                  currency_code: "CAD",
                  value: this.props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          this.setState({ loading : true });
          const order = await actions.order.capture();
          const finalOrder = {
            ...order,
            cart : this.props.cart,
            UserID : this.context.currentUser.email 
          }

          //! Posting data to the database.
          axios.post('/Order.json', finalOrder);

          //! Deleting the Cart if the order is successfull
          const keys = this.props.cart.map(cart => {
            return cart.uniqueKey;
          })
          console.log(keys);

          keys.forEach( async(key) => {
            await axios.delete(`/cart/${key}.json`);
          });

          //! sending Email to user for order status.
          const orderStatus = {
            user : this.context.currentUser.email,
            TransactionID : order.id
          }
          await emailjs.send('service_c31x8g4','template_ab2by6g', orderStatus ,'user_XFd6CZeKoty0lxpJ93veU' );

          this.setState({ loading : false });

          setTimeout(() => {
            this.props.history.push({pathname : '/Cart/Order'})
          }, 1000);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypal.current);
  }
  
  render(){
      return (
          <>
            {this.state.loading ? <Backdrop show={this.state.loading} ><Spinner /></Backdrop> : null }
            <div className='Paypal' ref = {this.paypal}></div>
          </>
      )
  }
}

export default withRouter(Paypal);