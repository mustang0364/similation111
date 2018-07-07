import React, { Component } from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
        
        list: [
            {
                name: 'Mustang1',
                price: 1200000,
                 imageurl: 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/wp-content/uploads/2017/07/2018-Ford-Mustang-EZPLACEMENT-626x382.jpg'
            },
            {
                name: 'Camaro',
                price: 10,
                imageurl: ''
            },
            {
                name: 'Tesla', 
                price: 622222,
                imageurl: ''
            }
        ],
        
        id: '',
        imageurl: '',
        name: '',
        price: ''
    }
}

componentDidMount() {
    axios.get('/api/inventory')
    .then(res => {
        
        this.setState({list: res.data.products});
        
    })
    
    .catch(err => console.log('Get inventory axios ', err));
}

reRender = () => {
    axios.get(`/api/inventory`)
    .then(res => {
        this.setState({list: res.data.products});
    }).catch(err => console.log('reRender', err));
}

handleImageChange = (val) => {
    this.setState({imageurl: val});
}
handleNameChange = (val) => {
    this.setState({name: val});        
}
handlePriceChange = (val) => {
    this.setState({price: val});        
}
//clears the input fields
cancel = (e) => {
    this.setState({
        imageurl: '',
        name: '',
        price: '',
        doEdit: false
    })
}

setEdit = (id) => {
    
    const copyOfArr = this.state.list.slice();
    
    let filteredProduct = copyOfArr.filter(product => product.id === id)[0];
    
    this.setState({
        id: id, // OR filteredProduct.id
        name: filteredProduct.name,
        price: filteredProduct.price,
        imageurl: filteredProduct.imageurl,
        doEdit: true
    });
}

editProduct = () => {
    const { doEdit, id, imageurl, name, price } = this.state; 
    
    console.log('doEdit---------------', doEdit);
    if(doEdit) {
   

        axios.put(`/api/inventory/${id}`, { imageurl, name, price })
        .then(res => {
            
            this.cancel();
            this.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Update Product error', err));
    } else {
        this.setState({doEdit: true});
    }
}

  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard displayList={this.state.list} setEdit={this.setEdit} reRender={this.reRender}/>
        
        <Form name={this.state.name}
        
         price={this.state.price} 
          imageurl={this.state.imageurl} 
        cancel={this.cancel} 
        doEdit={this.state.doEdit} 
        reRender={this.reRender}
        handleNameChange={this.handleNameChange} 
        handlePriceChange={this.handlePriceChange} 
        handleImageChange={this.handleImageChange} 
        editProduct={this.editProduct}/>
    
      
      </div>
    );
  }
}

export default App;
