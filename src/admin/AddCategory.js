import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createCategory } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import Swal from "sweetalert2";

const AddCategory = () => {
  const { user } = isAuthenticated();
  const initialState = {
    name: "",
  };
  const [category, setCategory] = useState(initialState);
  const { name } = category;
  const createProductCategory = (e) => {
    e.preventDefault();
    createCategory(
      user._id,
      category,
      JSON.parse(localStorage.getItem("jwt")).token
    )
      .then((data) => {
        if (data.error) {
          errorMessage(data.error);
        } else {
          setCategory({
            ...initialState,
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
      title: "Category",
      text: "Category created successfully",
    });
  };
  const onHandleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  const categoryForm = () => {
    return (
      <form className="container">
        <div className="mb-3">
          <label className="form-label">Enter the category</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onHandleChange}
            className="form-control"
            placeholder="For eg: Summer"
          />
        </div>
        <button
          onClick={createProductCategory}
          type="submit"
          className="btn btn-info d-block"
        >
          Create Category
        </button>
        <button type="button" className="btn btn-info mt-3 mb-2 btn-sm">
          <Link
            to="/admin/dashboard"
            className="text-decoration-none text-dark"
          >
            Admin Home
          </Link>
        </button>
      </form>
    );
  };
  return (
    <Base
      title="Create a category"
      description="Create a category for your tshirt"
      className="container bg-success"
    >
      <div className="row">
        <div className="col text-white">{categoryForm()}</div>
      </div>
    </Base>
  );
};

export default AddCategory;
