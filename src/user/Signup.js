import React, { useState } from "react";
import Swal from "sweetalert2";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import { Link, withRouter } from "react-router-dom";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    success: false,
  };
  const [field, setField] = useState(initialState);
  const { name, email, password, success } = field;

  const onHandleChange = (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    signup(field)
      .then((data) => {
        if (data.error) {
          errorMessage(data.error);
        } else {
          setField({
            ...initialState,
            success: true,
          });
          successMessage();
          proceedToSignin();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const successMessage = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Account created",
      text: "Signed up successfully",
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
  const proceedToSignin = () => {
    if (success) {
      return (
        <div className="col-md-12 text-center">
          <Link to="/signin">Proceed to Signin</Link>
        </div>
      );
    }
  };
  const signUpForm = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={name}
              onChange={onHandleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              value={email}
              onChange={onHandleChange}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              value={password}
              onChange={onHandleChange}
              type="password"
              className="form-control"
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
          {JSON.stringify(field)}
        </div>
      </div>
    );
  };
  return (
    <Base title="Signup page" description="A place for user to Signup!">
      {signUpForm()}
      {proceedToSignin()}
    </Base>
  );
};

export default withRouter(Signup);
