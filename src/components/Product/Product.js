import React from 'react';

const Product= (props) =>{
     const {id,name, imageurl, price}=props;
    return(
        <div className='Product'>
            <img src="{imageurl}" alt="{name}"/>
            <p>${name}</p>
            <p>${price}</p>
            
            <p>Product</p>
            <button onClick={() => props.deleteProduct(id)}>Delete</button>
            <button onClick={() => props.setEdit(id)}>Edit</button>
            
            </div>

    );
};
export default Product

