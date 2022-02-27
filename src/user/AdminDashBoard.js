import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashBoard = () => {
  const { user } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <div className="card bg-success text-white">
        <div className="card-body">
          <h5 className="card-title bg-dark text-center">Admin Navigation</h5>
          <ul className="bg-white container">
            <li>
              <Link to="/admin/create/category" className="text-success">
                Create categories
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className="text-success">
                Manage categories
              </Link>
            </li>
            <li>
              <Link to="/admin/create/product" className="text-success">
                Create Product
              </Link>
            </li>
            <li>
              <Link to="/admin/product" className="text-success">
                Manage Products
              </Link>
            </li>
            <li>
              <Link to="/admin/create/order" className="text-success">
                Create Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card bg-white text-dark">
        <div className="card-body">
          <h5 className="card-title ">Admin Information</h5>
          <ul className="bg-white container">
            <li>
              <h6>
               <span className="badge bg-success">Name:</span>&nbsp;{user.name}
              </h6>
            </li>
            <li>
              <h6>
                <span className="badge bg-success">Email:</span>&nbsp;{user.email}
              </h6>
            </li>
            <li>
              <h6>
               <span className="badge bg-danger">Admin Area</span>
              </h6>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
    >
      <div className="row">
        <div className="col-4">{adminLeftSide()}</div>
        <div className="col-8">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
