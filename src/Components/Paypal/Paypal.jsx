import React from 'react'
import {withRouter } from 'react-router-dom';
import './PayPal.scss'
import Spinner from '../UI/Spinner/Spinner'
import Backdrop from '../UI/Backdrop/Backdrop';
import axios from '../../Axios/Axios';

class Paypal extends React.Component{
  state = {
    loading : false
  }
  paypal = React.createRef()
  
  componentDidMount(){
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: 'Shoes',
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
            cart : this.props.cart
          }

          // !Posting data to the database.
          axios.post('/Order.json', finalOrder);
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