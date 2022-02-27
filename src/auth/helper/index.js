import { API } from "../../backend";
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    body: JSON.stringify(user), //When sending data to a web server, the data has to be a string.
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("myCart");
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")); //JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  } else {
    return false;
  }
};
