import React from 'react';
import './Cart.css';
const Cart = (props) => {
    console.log(props.cart)

    const {cart} = props
    console.log(cart)

    // let total =0;
    // for (const product of cart){
    //     total = total + product.price;
    // }

    // or

    let totalQunatity = 0;
    for(const product of cart){

        
        product.quantity = product.quantity?product.quantity:1
        totalQunatity = totalQunatity + product.quantity;
        console.log(product)

    }
    const total = cart.reduce((previous,product) => previous+product.price*(product.quantity?product.quantity:1),0);//using reduce

    const shipping = total>0?15:0;
    const tax = ((total + shipping) * 10)/100;
    const grandTotal = total + shipping + tax;
    


   

    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Total order:{totalQunatity}</h4>
            <p>Total: {total}</p>
            <p>Shipping: {shipping}</p>
            <p>tax: {tax}</p>
            <p>GrandTotal:{grandTotal}</p>
            <button >Order</button>
        </div>
    );
};

export default Cart;