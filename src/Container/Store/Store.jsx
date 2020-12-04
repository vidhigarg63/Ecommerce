import React, { Component } from 'react'
import './Store.scss'
import axios from '../../Axios/Axios';
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
            const API_URL = '/products.json';
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
        });


        const API_URL_CART = ('/cart.json');
        const response = await axios.get(API_URL_CART);
        // console.log(response.data);
        
        // check cart
        if(response.data === null){
            this.postData({...ProductToAdd[0], quantity : 1, totalPrice : ProductToAdd[0].price})
        }

        if(response.data !== null){
            const shouldPost = Object.keys(response.data).filter(key => {
                if(response.data[key].id === id){
                    return true
                }
            });

            if(shouldPost.length > 0){
                // method to put new Cart data
                shouldPost.forEach(key => {
    
                // now we will put data
                const DataToPut = {
                    ...response.data[key],
                    quantity : response.data[key].quantity ? response.data[key].quantity+1 : 1,
                    totalPrice : response.data[key].totalPrice ? response.data[key].totalPrice += response.data[key].price : response.data[key].price,
                    }
                this.putData(DataToPut,key)                    
                });
            }else if(shouldPost.length === 0){
                this.postData({...ProductToAdd[0], quantity : 1, totalPrice : ProductToAdd[0].price});
            }
            
            console.log(shouldPost);
        }
    }

    postData = async(data) => {
        try{
            const API_URL_CART = ('/cart.json')
            const postResponse = await axios.post(API_URL_CART, data);
            console.log(postResponse);
        }
        catch(error){
            console.log(error);
        }
    }
    putData = async(data, id) => {
        try{
            const API_URL_CART = (`/cart/${id}.json`)
            await axios.put(API_URL_CART, data);
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
