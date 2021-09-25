import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [displayProducts,setDisplayProducts] = useState([])
  useEffect(() => {
    console.log("api called");
    fetch("./products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayProducts(data);
        console.log("product recieved from api");
      });
  }, []);


 
  useEffect(() => {
    console.log("start getting local data");
    if (products.length) {
      const saveCart = getStoredCart();

      const storedCart = [];
      for (const key in saveCart) {
        console.log(key);
        console.log(saveCart[key]);
        const addedProduct = products.find((product) => key === product.key);
        if(addedProduct){
            const quantity = saveCart[key];
            addedProduct.quantity = quantity;
            storedCart.push(addedProduct);
            console.log(addedProduct)
        }

        console.log(key, addedProduct);
      }
      setCart(storedCart)
    }
    console.log("end getting local data");
  }, [products]);

 
  
  const handleAddToCart = (product) => {
    
    console.log(product);
    
    console.log(cart)
    let exist = false;
    
    for(const c of cart)
    {
      if(c.key=== product.key){
        exist = true;
        c.quantity=c.quantity+1;
      }
    }
    if(!exist){

      const newCart = [...cart, product];
      setCart(newCart);
    }
    else{

      const newCart = [...cart];
      setCart(newCart);
    }
    
    
    // save to local sotrage
    addToDb(product.key);
  };

  const handleSearch =(event) =>{
    console.log(event.target.value);
    const searchText = event.target.value;

    const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log(matchedProducts);
    setDisplayProducts(matchedProducts);

  }
  console.log(cart)
  return (
   <div>
     <div className="search-container">
       <input type="text"
       onChange={handleSearch}
       placeholder="Search Product"/>
     </div>
      <div className="shop-container">
      <div className="product-container">
        {displayProducts.map((product) => (
          <Product
            product={product}
            key={product.key}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
   </div>
  );
};

export default Shop;
