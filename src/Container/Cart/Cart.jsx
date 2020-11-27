import React, { Component } from 'react'
import axios from 'axios';
import CartRow from '../../Components/CartRow/CartRow.jsx';
import './Cart.scss';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CartProduct : [],
        }
    }
    
    async componentDidMount(){
        // Making Request to get cart Elements.
        const API_URL_CART = ('https://e-commerce-ddfd4.firebaseio.com/cart.json')
        const response = await axios.get(API_URL_CART);

        let cart = [];
        Object.entries(response.data).map((key) => {
            cart.push({...key[1],uniqueKey : key[0] });
        })
        this.setState({ CartProduct : cart });
    }

    incrementHandler = async(id) => {
        const oldState = this.state.CartProduct;        

        const updatedObject = oldState.filter(product => {
            if(product.uniqueKey === id){
                return product.quantity = product.quantity + 1;  
            }
        })
        console.log(updatedObject);

        const UpdatedStateObject = oldState.map(product => product)
        console.log(UpdatedStateObject);

        try{
            const API_URL_CART = (`https://e-commerce-ddfd4.firebaseio.com/cart/${id}.json`)
            await axios.put(API_URL_CART, updatedObject[0]);
        }
        catch(error){
            console.log(error);
        }
        this.setState({ CartProduct : UpdatedStateObject });
    }

    decrementHandler = async(id) => {
        const oldState = this.state.CartProduct;        

        const updatedObject = oldState.filter(product => {
            if(product.uniqueKey === id){
                return product.quantity = product.quantity - 1;  
            }
        })
        console.log(updatedObject);

        const UpdatedStateObject = oldState.map(product => product)
        console.log(UpdatedStateObject);

        try{
            const API_URL_CART = (`https://e-commerce-ddfd4.firebaseio.com/cart/${id}.json`)
            await axios.put(API_URL_CART, updatedObject[0]);
        }
        catch(error){
            console.log(error);
        }
        this.setState({ CartProduct : UpdatedStateObject });
    }



    render() {
        let displayData = '';
        if(this.state.CartProduct.length === 0){
            displayData = <p>Cart is empty</p>
        }else{
            displayData = (
                this.state.CartProduct.map(product => {
                    return (
                        <CartRow key = {product.uniqueKey}
                            price = {product.price}
                            image = {"/Shoes/"+product.image}
                            style = {{width : '80px', height : '80px'}}
                            quantity = {product.quantity}
                            incrementHandler = {() => this.incrementHandler(product.uniqueKey)}
                            decrementHandler = {() => this.decrementHandler(product.uniqueKey)}
                        />
                    );
                })
            );
        }

        return (
            <div className='Cart'>
                <h2>Your Cart</h2>
                <section className='ProductList'>
                    {displayData}
                </section>
            </div>
        )
    }
}

export default Cart
