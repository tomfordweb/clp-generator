export const fetchProductList = () =>
  fetch("/api/v1/fragrances", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
