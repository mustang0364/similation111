import React, { Component } from 'react';

import axios from 'axios';

export default class Form extends Component {


    addToInventory() {
        
        const { imageurl, name, price } = this.props;
       
        
        axios.post('/api/inventory', {imageurl, name, price})
        .then(res => {
            
            this.props.cancel();
            
            this.props.reRender();
            
            alert(res.data.message);
            
        }).catch(err => console.log('herro 👆', err));
    }

    render() {
        
        const { id, imageurl, name, price, doEdit } = this.props;
        return (
            <div>
                <form>
                    <img src={imageurl} alt={name} />
                    <h3>Image URL: </h3>
                    <input type='text' onChange={e => this.props.handleImageChange(e.target.value)} value={imageurl}/>
                    <h3>Product Name: </h3>
                    <input type='text' onChange={e => this.props.handleNameChange(e.target.value)} value={name}/>
                    <h3>Price: </h3>
                    <input type='text' onChange={e => this.props.handlePriceChange(e.target.value)} value={price}/>
                </form>
                <button onClick={e => this.props.cancel(e)}>Cancel</button>
                <button onClick={e => doEdit ? this.props.editProduct(id) : this.addToInventory(e)}>{doEdit ? 'Save' : 'Add '}</button>
            </div>
        );
    }
}