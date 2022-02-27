import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Base from "../core/Base";
import {
  updateCategory,
  getCategory,
} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  let { id } = useParams();
  const { user } = isAuthenticated();
  const initialState = {
    name: "",
  };
  const [category, setCategory] = useState(initialState);
  const { name } = category;
  const updateACategory = (e) => {
    e.preventDefault();
    updateCategory(
      user._id,
      id,
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
  const loadCategory = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategory(data);
        }
      })
      .catch();
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
      text: "Category updated successfully",
    });
  };
  const onHandleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    loadCategory(id);
  }, []);
  const updateCategoryForm = () => {
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
          onClick={updateACategory}
          type="submit"
          className="btn btn-info d-block"
        >
          Update Category
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
      title="Update category here"
      description="Update category"
      className="container bg-success"
    >
      <div className="row">
        <div className="col text-white">{updateCategoryForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
