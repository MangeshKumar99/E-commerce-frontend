import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllCategories, createProduct } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import Swal from "sweetalert2";

const AddProduct = () => {
  const formData = new FormData();
  const { user } = isAuthenticated();
  const initialState = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    categories: [],
    photo: "",
    formData: "",
  };
  const [product, setProduct] = useState(initialState);
  const { name, description, price, stock, categories } = product;

  const createAProduct = (e) => {
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
    e.preventDefault();
    createProduct(
      user._id,
      formData,
      JSON.parse(localStorage.getItem("jwt")).token
    )
      .then((data) => {
        if (data.error) {
          errorMessage(data.error);
        } else {
          setProduct({
            ...initialState,
            categories:categories
            
          });
          successMessage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCategories = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct({
            ...product,
            categories: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadCategories();
  }, []);

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
      title: "Product",
      text: "Product created successfully",
    });
  };

  const onHandleChange = (e) => {
    // FormData is a special type of object which is not stringifyable can cannot just be printed out using console.log.
    if (e.target.name === "photo") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createProductForm = () => {
    return (
      <form>
        <div className="mb-2">
          <label className="form-label">Post photo</label>
          <input
            className="form-control"
            type="file"
            name="photo"
            accept="image"
            onChange={onHandleChange}
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>

        <div className="mb-2">
          <textarea
            name="description"
            value={description}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="mb-2">
          <input
            type="number"
            name="price"
            value={price}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Price"
          />
        </div>

        <div className="mb-2">
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

        <div className="mb-2">
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={onHandleChange}
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="d-flex mb-1">
          <button
            onClick={createAProduct}
            type="submit"
            className="btn btn-info btn-sm"
          >
            Create Product
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
      title="Create a product here"
      description="Welcome to product creation section"
      className="container bg-success"
    >
      <div className="row container">
        <div className="col text-white">{createProductForm()}</div>
      </div>
    </Base>
  );
};
export default AddProduct;
