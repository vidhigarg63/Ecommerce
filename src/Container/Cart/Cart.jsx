import React, { Component } from 'react'
import axios from 'axios';
import CartRow from '../../Components/CartRow/CartRow.jsx';
import './Cart.scss';
import Checkout from '../../Components/Checkout/Checkout.jsx';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CartProduct : [],
            totalPrice : ''
        }
    }
    
    productChangeHandler = async(id, type) => {
        const oldState = this.state.CartProduct; 
        let updatedObject = null
        console.log(type);
        switch(type){
            case 'inc':  updatedObject = oldState.filter(product => {
                let data = null;   
                if(product.uniqueKey === id){
                        data = product.quantity = product.quantity + 1;
                        product.totalPrice += product.price
                    }
                    return data;
                })
                break;
            
            case 'dec' :  updatedObject = oldState.filter(product => {
                let data = null;
                if(product.uniqueKey === id){
                        data = product.quantity -=  1;
                        product.totalPrice -= product.price  
                    }
                    return data;
                })
                break;
            default : console.log("Choice not Valid");
        }
        
        console.log({updatedObject});

        try{
            const API_URL_CART = (`https://e-commerce-ddfd4.firebaseio.com/cart/${id}.json`)
            await axios.put(API_URL_CART, updatedObject[0]);
        }
        catch(error){
            console.log(error);
        }

        // getting total price
        const totalPrice = oldState.map(product => {
            return product.totalPrice;
        }).reduce((acc, curr) => acc + curr)
        this.setState({ CartProduct : oldState, totalPrice : totalPrice });
    }

    removeHandler = async(id) => {
        console.log(id);
        const API_URL_CART = (`https://e-commerce-ddfd4.firebaseio.com/cart/${id}.json`)
        await axios.delete(API_URL_CART);
        await this.getData();   
    }

    getData = async() => {
        const API_URL_CART = ('https://e-commerce-ddfd4.firebaseio.com/cart.json')
        const response = await axios.get(API_URL_CART);
        
        if(response.data !== null){
            let cart = [];
            Object.entries(response.data).map((key) => {
                return cart.push(
                    {
                        ...key[1],
                        uniqueKey : key[0],
                    })
            });

            // getting total price
            const totalPrice = cart.map(product => {
                return product.totalPrice;
            }).reduce((acc, curr) => acc + curr)
            
            this.setState({ CartProduct : cart, totalPrice : totalPrice });
        }
        else if(response.data === null){
            this.setState({ CartProduct : [], totalPrice : '' });
        }
    }

    async componentDidMount(){
        // Making Request to get cart Elements.
        await this.getData();
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
                            description = {product.description}
                            quantity = {product.quantity}
                            id = {product.uniqueKey}
                            productChangeHandler = {this.productChangeHandler}
                            removeHandler = {this.removeHandler}
                        />
                    );
                })
            );
        }

        return (
            <div>
                <section className='Cart'>
                    <section className='ProductList'>
                        {displayData}
                    </section>

                    <div>
                        <Checkout 
                            price = {this.state.totalPrice}
                            totalPrice = {(this.state.totalPrice * 1.15).toPrecision(4)}
                            GST = {(this.state.totalPrice * 0.075).toPrecision(4)}
                            QST={(this.state.totalPrice * 0.075).toPrecision(4)}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default Cart
