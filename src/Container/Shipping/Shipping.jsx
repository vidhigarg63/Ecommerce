import React, { Component } from 'react'
import './Shipping.scss'
import axios from '../../Axios/Axios'
import ShippingCard from '../../Components/ShippingCard/ShippingCard';
import ShippingDetails from '../../Components/ShippingDetails/ShippingDetails';
import Button from '../../Components/UI/Button/Button'

export class Shipping extends Component {
    state = { 
        orders : [],
        show : []
    }

    async componentDidMount(){
        const {data} = await axios.get('/Order.json');
        let newOrderArray = [];
        Object.entries(data).map(ordersArray => {
            return newOrderArray.push(ordersArray[1])
        });
        console.log(newOrderArray);

        let showArray = new Array(newOrderArray.length).fill(false);       
        this.setState({ orders : newOrderArray, show : showArray });
    }

    getShippingDetail = (order) => {
        return order.purchase_units.map((purchase, index) => {
            return(
                <ShippingDetails
                    key = {index}
                    price = {purchase.amount.currency_code+' '+purchase.amount.value} 
                    name = {purchase.shipping.name.full_name}
                    address = {purchase.shipping.address.address_line_1}
                    city = {purchase.shipping.address.admin_area_2 +', '+ purchase.shipping.address.admin_area_1 +', '+ purchase.shipping.address.postal_code}
                    country = {purchase.shipping.address.country_code}
                />
            )
        })
    }

    getProductDetail = (order) => {
        return order.cart.map((cart,index) => {
            return (
                <ShippingCard 
                    key = {index}
                    image = {"/Shoes/"+cart.image}
                    description = {cart.description}
                    price = {cart.price}
                    quantity = {cart.quantity}
                />
            )
        })
    }
    toggle = (index) => {
        console.log(index);
        const oldState = this.state.show;
        console.log(oldState);
        oldState.splice(index,1,!oldState[index]);
        console.log(oldState)
        this.setState({ show : oldState });
    }

    render() {
        
        let userInterface = ''
        if(this.state.orders.length === 0){
            userInterface = <h2>Something went wrong or You haven't place any order yet</h2>
        }else if(this.state.orders.length > 0){
            userInterface = (   
               this.state.orders.map((order, index) => {
                    return(
                        <div className='OrderList'>
                            <section className='OrderPreview'>
                                <article>
                                    <h4 >Transaction ID</h4>
                                    <p>{order.id}</p>
                                </article>
                                {order.purchase_units.map(purchase => <p>{purchase.amount.currency_code+' '+purchase.amount.value}</p>)}
                                <Button buttonType='Subscribe' clicked={() => this.toggle(index)} >Details</Button>
                            </section>

                            {this.state.show[index] ? 
                            <>
                                <section>
                                    {this.getShippingDetail(order)}
                                </section>
                                <section className='ProductsDetails'>
                                    <h4>Purchased Items</h4>
                                    {this.getProductDetail(order)}
                                </section>
                            </> : null }
                        </div>
                    )
               })
            )
        }
        return (
            <div className = 'Shipping'>
                {userInterface}
            </div>
        )
    }
}

export default Shipping