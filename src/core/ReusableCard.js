import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { getAllProducts } from "../admin/helper/adminapicall";
import { API } from "../backend";

const ReusableCard = () => {
  const addToCart = true;
  const removeFromCart = false;
  const initialState = [];
  let cartArray = [];
  const [product, setProduct] = useState(initialState);
  const [redirect, setRedirect] = useState(false);
  const addProductToCart = (myProduct) => {
    cartArray = JSON.parse(localStorage.getItem("myCart") || "[]");
    cartArray.push(myProduct)
    localStorage.setItem("myCart", JSON.stringify(cartArray));
    setRedirect(true);
  };
  const loadProducts = () => {
    getAllProducts()
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (redirect) {
    return <Redirect to="/cart" />;
  }

  return (
    <>
      {product.map((pro, index) => {
        return (
          <div className="card w-25 text-center text-white bg-dark border-1 border-info">
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
                onClick={() => addProductToCart(pro)}
                type="button"
                className="btn btn-outline-success m-2"
              >
                Add To Cart
              </button>
            )}
            {removeFromCart && (
              <button type="button" className="btn btn-outline-danger m-2">
                Remove From Cart
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default withRouter(ReusableCard);
