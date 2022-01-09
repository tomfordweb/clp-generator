export const convertObjectNullValuesToStr = (object) => {
  const ret = {};

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      ret[key] = object[key] ?? "";
    }
  }
  return ret;
};

export const fetchProductList = () =>
  fetch("/api/v1/fragrances", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(function (response) {
    return response.json();
  });

export const createFragrance = (values) =>
  fetch(`/api/v1/fragrances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(function (response) {
    return response.json();
  });
export const updateFragrance = (fragrance_id, values) =>
  fetch(`/api/v1/fragrances/${fragrance_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(function (response) {
    return response.json();
  });
export const fetchFragranceProductList = (fragrance_id) =>
  fetch(`/api/v1/fragrances/${fragrance_id}/products`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
