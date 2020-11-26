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
        const API_URL_CART = ('https://e-commerce-ddfd4.firebaseio.com/cart.json')
        const response = await axios.get(API_URL_CART);

        const CartProduct = []
        for (const key in response.data) {
            CartProduct.push(response.data[key]);
        }
        
        // Checking out Quantities
        const counts = {};
        CartProduct.map(products => {
            counts[products.description] = counts[products.description] ? counts[products.description] + 1 : 1;
        });

        // Creating new Object
        const newCart = CartProduct.map(products => {
            return {
                desc : products.description,
                price : products.price,
                image : products.image,
                id : products.id,
                quantity : counts[products.description]
            }
        })
                
        // Unique Recordss
        const unique = [...new Set(newCart.map(item => item.id))];
        const finalCart = unique.map(productid => {
            return {
                id : productid,
                description : newCart.find( product => product.id === productid ).desc,
                image : newCart.find( product => product.id === productid ).image,
                price : newCart.find( product => product.id === productid ).price,
                quantity : newCart.find( product => product.id === productid ).quantity,
            }
        })      

        console.log(finalCart)
        this.setState({ CartProduct : finalCart });
    }

    render() {
        let displayData = '';
        if(this.state.CartProduct.length === 0){
            displayData = <p>Cart is empty</p>
        }else{
            displayData = (
                this.state.CartProduct.map((products,index) => {
                    return (
                        <CartRow key={products.id + index} 
                        image={`/Shoes/${products.image}`} 
                        style={{width : '100px'}}
                        description={products.description}
                        price={products.price}
                        quantity={products.quantity}
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
