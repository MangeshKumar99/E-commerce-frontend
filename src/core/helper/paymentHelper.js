const { API } = require("../../backend");

export const getToken = (userID, token) => {
  return fetch(`${API}/payment/gettoken/${userID}`, {
    method: "GET",
    headers: {
      //   accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const processTransaction = (userID, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${userID}`, {
    method: "POST",
    body: JSON.stringify(paymentInfo),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
