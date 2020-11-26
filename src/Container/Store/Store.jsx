import React, { Component } from 'react'
import './Store.scss'
import axios from 'axios';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Card from '../../Components/Card/Card';

class Store extends Component {
    constructor(props) {
        super(props)
        this.state = {
            responseData : [],
            SearchData : [],
            found : false,
            rendered : false,
        }
    }
    
    async componentDidMount(){
        try {
            const API_URL = 'https://e-commerce-ddfd4.firebaseio.com/products.json';
            const response = await axios.get(API_URL);
            this.setState({ responseData : response.data, rendered : true });
        } catch (error) {
            console.error(error)
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props !== prevProps) {     
            const data = Object.values(this.state.responseData)
            .filter((product) => {
                if(product.article.toLowerCase().includes(this.props.search.toLowerCase())){
                    this.setState({ found : product.article.toLowerCase().includes(this.props.search.toLowerCase()) })
                    return product;
                }
            })
            console.log(data);
            this.setState({ SearchData : data });
        }
      }

    addToCartHandler = async(id) => {
        // Object to be added into cart
        const ProductToAdd = Object.values(this.state.responseData).filter(products => {
            return (products.id === id)
        })            
        try{
            const API_URL_CART = ('https://e-commerce-ddfd4.firebaseio.com/cart.json')
            const postResponse = await axios.post(API_URL_CART, ProductToAdd[0]);
            console.log(postResponse);
        }
        catch(error){
            console.log(error);
        }
    }
    
    render() {
        let response = <Spinner />;
        // rendered but no data
        if(Object.entries(this.state.responseData).length === 0 && this.state.rendered){
            response = <h1>Something Went Wrong</h1>;
        }

        // data is present and not match found
        else if(!this.state.found){
            response = Object.keys(this.state.responseData).map(keys => {
                return (
                    <Card key={this.state.responseData[keys].id}
                        image = {this.state.responseData[keys].image} 
                        title = {this.state.responseData[keys].article}
                        description = {this.state.responseData[keys].description}
                        price = {this.state.responseData[keys].price}
                        style = {{width : '250px', height : '300px'}}
                        addToCartHandler = {() => this.addToCartHandler(this.state.responseData[keys].id)}
                    />
                );
            });
        }
        else if(this.state.found && this.state.SearchData.length === 0){
            response = <h2>Not Found</h2>
        }

        else if(this.state.found){
            response = this.state.SearchData.map(product => {
                return (
                    <Card key={product.id}
                        image = {product.image} 
                        title = {product.article}
                        description = {product.description}
                        price = {product.price}
                        style = {{width : '250px', height : '300px'}}
                        addToCartHandler = {() => this.addToCartHandler(product.id)}
                    />
                );
            })
        }

        return (
            <div className='ProductDisplay'>
                {response}
            </div>
        )
    }
}

export default Store
