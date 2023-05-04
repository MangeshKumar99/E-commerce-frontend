import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import Base from "./Base";
import Payment from "./Payment";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const addToCart = false;
  const removeFromCart = true;

  const removeItemFromCart = (proId) => {
    let myCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    let newMyCart = [];
    for (let i = 0; i < myCart.length; i++) {
      if (myCart[i]._id !== proId) {
        newMyCart.push(myCart[i]);
      }
    }
    localStorage.setItem("myCart", JSON.stringify(newMyCart));
    setCart(newMyCart);
  };
  const getAmount = () => {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {
      amount = amount + cart[i].price;
    }
    return amount;
  };

  useEffect(() => {
    const myCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    setCart(myCart);
  }, []);
  return (
    <Base title="Welcome to your cart" description="Ready for checkout ">
      <button type="button" className="btn btn-info mt-3 mb-2 btn-sm">
        <Link to="/" className="text-decoration-none text-dark">
          Home
        </Link>
      </button>
      <div className="row cart-section">
        <div className="col-12 col-md-6">
          <div className="text-info">Your bill is ${getAmount()}</div>
          What's in your cart? &nbsp;&nbsp;{cart.length} products currently
          <>
            {cart.map((pro, index) => {
              return (
                <div
                  style={{ width: "20rem" }}
                  className="card text-center text-white bg-dark border-1 border-info"
                >
                  <div className="card-text">{pro.name}</div>
                  <img
                    src={`${API}/product/photo/${pro._id}`}
                    alt="Product unavailable"
                    className="p-2 w-100"
                  />
                  <div className="bg-success m-2">{pro.description}</div>
                  <div className="bg-info m-2">${pro.price}</div>
                  {addToCart && (
                    <button
                      type="button"
                      className="btn btn-outline-success m-2"
                    >
                      Add To Cart
                    </button>
                  )}
                  {removeFromCart && (
                    <button
                      onClick={() => removeItemFromCart(pro._id)}
                      type="button"
                      className="btn btn-outline-danger m-2"
                    >
                      Remove From Cart
                    </button>
                  )}
                </div>
              );
            })}
          </>
        </div>
        <div className="col-12 col-md-6">
          <Payment />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
