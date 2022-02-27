import React, { useState } from "react";
import Swal from "sweetalert2";
import { authenticate, isAuthenticated, signin } from "../auth/helper/index";
import { Redirect } from "react-router-dom";
import Base from "../core/Base";

const Signin = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [field, setField] = useState(initialState);
  const { user } = isAuthenticated();

  const { email, password } = field;

  const onHandleChange = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    signin(field)
      .then((data) => {
        if (data.error) {
          errorMessage(data.error);
        } else {
          authenticate(data, () => {
            setField({
              ...initialState,
            });
          });
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

  const signInForm = () => {
    if (user && user.role === 0) {
      return <Redirect to="/user/dashboard" />;
    }
    if (user && user.role === 1) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={onHandleChange}
              value={email}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={onHandleChange}
              value={password}
              name="password"
            />
          </div>
          <div className="d-grid gap-2">
            <button
              onClick={onSubmit}
              className="btn btn-success"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin page" description="A place for user to Signin!">
      {signInForm()}
    </Base>
  );
};

export default Signin;
