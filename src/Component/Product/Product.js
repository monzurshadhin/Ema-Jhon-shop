import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from "react-rating";
import './Product.css';


const element = <FontAwesomeIcon icon={faShoppingCart} />

const Product = (props) => {
    // console.log(props)
    const {img,name,stock,price,seller,star}=props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h3 className="name">{name}</h3>
                <p><small>By:{seller}</small></p>
                <p>Price:{price}</p>
                <p><small>Opnly {stock} left in stock - order soon</small></p>
                <Rating readonly  emptySymbol="far fa-star fa-2x icon-color" fullSymbol="fas fa-star fa-2x icon-color"
                initialRating={star}/>
                <br />
                <button className="cart-btn" onClick={()=>props.handleAddToCart(props.product)}>{element}Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;