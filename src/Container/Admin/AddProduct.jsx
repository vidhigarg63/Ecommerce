import React, { Component } from 'react'
import app from '../../Firebase/Firebase';
import axios from '../../Axios/Axios';
import './AddProduct.scss'

class AddProduct extends Component {
    state = {
        link : '',
    }

    fileHandler = async(event) => {
        const file = event.target.files[0];
        const storeRef = app.storage().ref()
        const fileRef = storeRef.child(file.name);
        
        try {
            await fileRef.put(file)
            const link = await fileRef.getDownloadURL()
            this.setState({ link : link });

        } catch (error) {
            console.log(error)
        }
    }

    uploadHandler = async(event) => {
        event.preventDefault();

        const form = event.target
        const formData = new FormData(form);
        formData.append("image", this.state.link);
        
        // For values
        let product = {};
        for (var [key, value] of formData.entries()) { 
            key === 'price' || key === 'id' ? product[key] = +value : product[key] = value
        }
        console.log({product});
        const response = await axios.post('/products.json',product);
        event.target.reset();
        console.log(response)

         
    }
    render() {
        return (
            <div className='ProductDiv'>
                <form onSubmit={this.uploadHandler}>
                    <legend>Add Product</legend>
                        <input name='article' type='text' placeholder='Article Name' />
                        <input name='description' type='text' placeholder='Description of Product' />
                        <input name='id' type='number' placeholder='ID' />
                        <input name='price' type='number' placeholder='Product Price' />
                        <input type='file' name='ShoeImage' onChange={this.fileHandler} />
                        <input type='submit' className='Submit'/>
                </form>
            </div>
        )
    }
}

export default AddProduct
