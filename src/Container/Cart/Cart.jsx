import React, { Component } from 'react'
import axios from '../../Axios/Axios';
import CartRow from '../../Components/CartRow/CartRow.jsx';
import './Cart.scss';
import Checkout from '../../Components/Checkout/Checkout.jsx';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CartProduct : [],
            totalPrice : 0,
            discount : 0,
            GST : 0,
            priceAfterDiscount : 0,
            shouldDisable : false,
            error : false,
        }
        this.inputRef = React.createRef();
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
            const API_URL_CART = (`/cart/${id}.json`)
            await axios.put(API_URL_CART, updatedObject[0]);
        }
        catch(error){
            console.log(error);
        }

        // getting total price
        const totalPrice = oldState.map(product => {
            return product.totalPrice;
        }).reduce((acc, curr) => acc + curr)
        const GST = parseFloat((totalPrice * 0.075).toPrecision(4));
        this.setState({ CartProduct : oldState, totalPrice : totalPrice, GST : GST });
    }

    removeHandler = async(id) => {
        console.log(id);
        const API_URL_CART = (`/cart/${id}.json`)
        await axios.delete(API_URL_CART);
        await this.getData();   
    }

    getData = async() => {
        const API_URL_CART = ('/cart.json')
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
            const GST = parseFloat((totalPrice * 0.075).toPrecision(4));
            this.setState({ CartProduct : cart, totalPrice : totalPrice, GST : GST });
        }
        else if(response.data === null){
            this.setState({ CartProduct : [], totalPrice : '', GST : 0 });
        }
    }

    // PromoCode handler
    inputHandler = async(event) => {
        
        // getting the input value for the coupon feild
        const coupon = this.inputRef.current.value;

        const API_URL_CART = ('/coupons.json')
        const {data} = await axios.get(API_URL_CART);
        
        // Gets and object so we convert into array use 0 index as code and 1 as discount %
        const discount = Object.entries(data).filter(entries => {
            return entries[0] === coupon;
        });
        
        if(discount.length > 0){
            const totaldiscount = discount[0][1];
            const initialPrice = (this.state.totalPrice * 1.15);
            const discountPrice = ((initialPrice * totaldiscount) / 100).toPrecision(4);
            const priceAfterDiscount = (initialPrice - discountPrice).toPrecision(4);
            this.setState({ discount: totaldiscount, shouldDisable: true, error : false });
        }else{
            this.setState({ error : true , discount : 0 });
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
                            {...this.porps}
                        />
                    );
                })
            );
        }
        
        const {discount, priceAfterDiscount} = this.state;
        let finalPrice = (this.state.totalPrice * 1.15).toPrecision(4)
        if(discount !== 0){
            finalPrice = ((this.state.totalPrice * 1.15) - this.state.totalPrice * discount / 100 ).toPrecision(4)
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
                            totalPrice = {finalPrice}
                            GST = {this.state.GST}
                            QST = {this.state.GST}
                            ref = {this.inputRef}
                            discount = {this.state.discount}
                            inputHandler = {this.inputHandler}
                            shouldDisable = {this.state.shouldDisable}
                            error = {this.state.error}
                            {...this.props}
                            cart = {this.state.CartProduct}
                        />
                    </div>

                    
                </section>
            </div>
        )
    }
}

export default Cart
