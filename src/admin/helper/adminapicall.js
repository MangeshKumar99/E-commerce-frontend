import { API } from "../../backend";
//Category calls

export const createCategory = (userID, category, token) => {
  return fetch(`${API}/category/create/${userID}`, {
    method: "POST",
    body: JSON.stringify(category), //When sending data to a web server, the data has to be a string.
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

export const updateCategory = (userID, categoryId, category, token) => {
  return fetch(`${API}/category/${categoryId}/${userID}`, {
    method: "PUT",
    body: JSON.stringify(category), //When sending data to a web server, the data has to be a string.
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

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const deleteCategory = (userID, categoryID, token) => {
    return fetch(`${API}/category/${categoryID}/${userID}`, {
      method: "DELETE",
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

// Product Calls

export const createProduct = (userID, product, token) => {
  return fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    body: product,
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

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = (userID, productID, token) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "DELETE",
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
export const updateProduct = (userID, productId, token, product) => {
  return fetch(`${API}/product/${productId}/${userID}`, {
    method: "PUT",
    body: product, //When sending data to a web server, the data has to be a string.
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
