import axios from "axios";
import { jwtDecode } from "jwt-decode";

const REST_ENDPOINT = "http://localhost:8080";

let axiosFetch = axios.create();

const getUsernameFromToken = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.sub;
};

export const authApi = {
  login(request) {
    return axiosFetch.post(`${REST_ENDPOINT}/auth/generateToken`, request);
  },
  loadUserHome(token) {
    const username = getUsernameFromToken(token);

    const config = {
      headers: {
        Authorization: "Bearer " + token, // Include the JWT token in the Authorization header
      },
    };

    return axiosFetch.get(
      `${REST_ENDPOINT}/auth/user/home?username=${username}`,
      config
    );
  },
  loadManagerHome(token) {
    const username = getUsernameFromToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    };

    return axiosFetch.get(
      `${REST_ENDPOINT}/auth/manager/home?username=${username}`,
      config
    );
  },
  loadManagerRestricted(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    };

    return axiosFetch.get(`${REST_ENDPOINT}/auth/manager/restricted`, config);
  },
  getUser(username) {
    return axiosFetch.get(
      `${REST_ENDPOINT}/auth/getUserByUsername?username=${username}`
    );
  },
};
