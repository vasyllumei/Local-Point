const { default: axios } = require("axios");

const googlePlacesApi = (category, radius, lat, lng) =>
  axios.get(
    `/api/google-place?category=${category}&radius=${radius}&lat=${lat}&lng=${lng}`,
  );

export default {
  getGooglePlace: googlePlacesApi,
};
