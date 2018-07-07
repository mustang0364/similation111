import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';

export default class Dashboard extends Component {
   
    delete = (id) => {
       
        axios.delete(`/api/inventory/${id}`)
        .then(res => {
            
            this.props.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Delete error', err));
    } 

    render() {
        
        const { displayList } = this.props;
        return (
            <div>
                Dashboard
                
                {displayList && displayList.map((item, i) => <div key={i}><Product {...item} deleteProduct={this.delete} setEdit={this.props.setEdit}/></div>)} 
                
                
            </div>
        );
    }
}