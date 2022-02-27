import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
const ManageProducts = () => {
  const { user } = isAuthenticated();
  const initialState = [];
  const [product, setProduct] = useState(initialState);
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

  const deleteAProduct = (proId) => {
    deleteProduct(
      user._id,
      proId,
      JSON.parse(localStorage.getItem("jwt")).token
    )
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          loadProducts();
        }
      })
      .catch();
  };

  return (
    <Base
      title="Manage your products here"
      description="Welcome to manage-product section"
    >
      <button type="button" className="btn btn-info btn-sm">
        <Link to="/admin/dashboard" className="text-decoration-none text-dark">
          Admin Home
        </Link>
      </button>
      <h5 className="d-flex justify-content-center">
        Total {product.length} products
      </h5>
      {product.map((product, index) => {
        return (
          <>
            <div className="row">
              <div className="col-4">{product.name}</div>
              <div className="col-4">
                <button type="button" className="btn btn-success btn-sm">
                  <Link
                    // to="/admin/product/update"
                    to={`/admin/product/update/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    Update
                  </Link>
                </button>
              </div>
              <div className="col-4">
                <button
                  onClick={() => deleteAProduct(product._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        );
      })}
    </Base>
  );
};

export default ManageProducts;
