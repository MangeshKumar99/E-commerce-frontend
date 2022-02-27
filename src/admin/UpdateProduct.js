import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import {
  getProduct,
  getAllCategories,
  updateProduct,
} from "../admin/helper/adminapicall";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  let { id } = useParams();
  const formData = new FormData();
  const { user } = isAuthenticated();
  const initialState = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    photo: "",
    formData: "",
  };
  const [categories, setCategories] = useState([]);
  const [product, updateMyProduct] = useState(initialState);
  const { name, description, price, stock } = product;
  const updateAProduct = (e) => {
    e.preventDefault();
    for (const property in product) {
      if (
        property === "photo" ||
        property === "name" ||
        property === "description" ||
        property === "price" ||
        property === "category" ||
        property === "stock"
      )
        formData.append(property, product[property]);  
    }

    updateProduct(
      user._id,
      id,
      JSON.parse(localStorage.getItem("jwt")).token,
      formData
    )
      .then((data) => {
        if (data.error) {
          errorMessage(data.error);
        } else {
          updateMyProduct({
            ...initialState,
            categories: categories,
          });
          successMessage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorMessage = (err) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      text: err,
    });
  };
  const successMessage = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product update",
      text: "Product updated successfully",
    });
  };

  const getAProduct = (proId) => {
    getProduct(proId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateMyProduct({
          ...product,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
        });
      }
    });
  };

  const loadCategories = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategories();
    getAProduct(id);
  }, []);

  const onHandleChange = (e) => {
    // FormData is a special type of object which is not stringifyable can cannot just be printed out using console.log.
    if (e.target.name === "photo") {
      updateMyProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      updateMyProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };
  const updateProductForm = () => {
    return (
      <form>
        <div className="mb-3">
          <label className="form-label">Post photo</label>
          <input
            className="form-control"
            type="file"
            name="photo"
            accept="image"
            onChange={onHandleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            value={description}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={price}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Price"
          />
        </div>

        <div className="mb-3">
          <select
            name="category"
            onChange={onHandleChange}
            className="form-select"
          >
            <option>Select</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="d-flex">
          <button
            onClick={updateAProduct}
            type="submit"
            className="btn btn-info btn-sm"
          >
            Update Product
          </button>
          &nbsp;&nbsp;
          <button type="button" className="btn btn-info btn-sm">
            <Link
              to="/admin/dashboard"
              className="text-decoration-none text-dark"
            >
              Admin Home
            </Link>
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update your products here"
      description="Update product"
      className="container bg-success"
    >
      <div className="row container">
        <div className="col text-white">{updateProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
