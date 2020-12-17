import React, { Component } from 'react'
import axios from '../../Axios/Axios';
import CartRow from '../../Components/CartRow/CartRow.jsx';
import './Cart.scss';
import Checkout from '../../Components/Checkout/Checkout.jsx';
import { AuthContext } from '../../Context/AuthContext';
import NotFound from '../../Components/Error/NotFound';
import empty from '../../assets/Images/empty.jpg';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Cart extends Component {
    static contextType = AuthContext;
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
            show : false,
            loading : false,
        }
        this.inputRef = React.createRef();
    }
    
    productChangeHandler = async(id, type) => {
        const oldState = this.state.CartProduct; 
        let updatedObject = null
        // console.log(type);
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
            Object.entries(response.data).filter(key => {
                if(key[1].userEmail === this.context.currentUser.email){
                    return cart.push({
                        ...key[1],
                        uniqueKey : key[0]
                    })
                }
            })
            // console.log(cart);

            // getting total price
            if(cart.length > 0){
                const totalPrice = cart.map(product => {
                    return product.totalPrice;
                }).reduce((acc, curr) => acc + curr)
                const GST = parseFloat((totalPrice * 0.075).toPrecision(4));
                this.setState({ CartProduct : cart, totalPrice : totalPrice, GST : GST, show : true, loading : true });
            }
            else{
                console.log("EMPTY CART");
                this.setState({ CartProduct : [], totalPrice : '', GST : 0, show : false, loading : true });
            }
        }
        // else{
        //     console.log("Cart empty")
        //     this.setState({ CartProduct : [], totalPrice : '', GST : 0, show : false });
        // }
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
        let displayData = <Spinner />;
        if(this.state.show){
            displayData = (
                this.state.CartProduct.map(product => {
                    return (
                        <CartRow key = {product.uniqueKey}
                            price = {product.price}
                            image = {product.image}
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
        if(!this.state.show && this.state.loading){
            displayData = ( 
            <NotFound NotFound = {empty}>
                <h1>No Cart Found</h1>
                <p>We can't find your Cart, Look's like you haven't added any item to your cart yet.</p>
            </NotFound>
            )
        }
        
        const {discount} = this.state;
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

                    {this.state.show ?
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
                    </div>: null
                    }
                </section>
            </div>
        )
    }
}

export default Cart
