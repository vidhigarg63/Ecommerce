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

        if(response.data !== null){
            let cart = [];
            Object.entries(response.data).map((key) => cart.push({...key[1],uniqueKey : key[0] }));
            this.setState({ CartProduct : cart });
        }
    }

    incrementHandler = async(id, type) => {
        const oldState = this.state.CartProduct; 
        let updatedObject = null
        switch(type){
            case 'inc':  updatedObject = oldState.filter(product => {
                let data = null;        
                if(product.uniqueKey === id){
                    data = product.quantity = product.quantity + 1;
                    }
                    return data;
                })
                break;
            
            case 'dec' :  updatedObject = oldState.filter(product => {
                let data = null;
                if(product.uniqueKey === id){
                    data = product.quantity = product.quantity - 1;  
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
        this.setState({ CartProduct : oldState });
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
                            id = {product.uniqueKey}
                            incrementHandler = {this.incrementHandler}
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
