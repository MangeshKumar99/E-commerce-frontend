import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
const ManageCategories = () => {
  const { user } = isAuthenticated();
  const initialState = [];
  const [categories, setCategories] = useState(initialState);
  const loadCategories = () => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteACategory = (categoryId) => {
    deleteCategory(
      user._id,
      categoryId,
      JSON.parse(localStorage.getItem("jwt")).token
    )
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          loadCategories();
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
        Total {categories.length} categories
      </h5>
      {categories.map((category, index) => {
        return (
          <div className="row">
            <div className="col-4">{category.name}</div>
            <div className="col-4">
              <button type="button" className="btn btn-success btn-sm">
                <Link
                  to={`/admin/category/update/${category._id}`}
                  className="text-decoration-none text-dark"
                >
                  Update
                </Link>
              </button>
            </div>
            <div className="col-4">
              <button
                onClick={() => deleteACategory(category._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </Base>
  );
};

export default ManageCategories;
