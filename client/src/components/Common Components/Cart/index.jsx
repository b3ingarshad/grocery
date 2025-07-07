import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  // // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity + 1 > updatedCart[index].stock) {
      alert("Not enough stock available");
      return;
    }
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };
  const addToCart = (product) => {
    if (product.stock < 1) {
      alert("This product is out of stock.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      if (existingProduct.quantity + 1 > product.stock) {
        alert("Not enough stock available");
        return;
      }
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/user-home/cart");
  };
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };


  // Proceed to Checkout
  const proceedToCheckout = () => {
    navigate('/user-home/checkout');
  };



  const userName = localStorage.getItem('userName');

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.imageUrl || 'fallback-image.jpg'}
                alt={item.name}
                onError={(e) => (e.target.src = 'fallback-image.jpg')}
              />
              <h3>{item.name}</h3>
              <p>Rs {item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {userName ?
            <button onClick={proceedToCheckout} className="checkout-btn">
              Proceed to Payment
            </button>
            :
            <button onClick={() => navigate("/login")} className="checkout-btn">
              You Need To login
            </button>
          }
        </>
      )}
    </div>
  );
}
