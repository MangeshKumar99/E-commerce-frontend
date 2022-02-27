import { API } from "../../backend";

export const createOrder = (userID, orderData, token) => {
  console.log(orderData)
  return fetch(`${API}/order/create/${userID}`, {
    method: "POST",
    body: JSON.stringify({ order: orderData }),
    headers: {
      accept: "application/json",
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
