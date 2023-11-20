import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

function getToken() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return null;
  }
}

const headers = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

class Api {
  /**
   *
   * @param {*} url
   * @returns
   */
  async get(url) {
    const result = await api.get(url, headers);
    console.log(result);
    return result;
  }
  /**
   *
   * @param {*} url
   * @param {*} data
   * @returns
   */
  async post(url, data) {
    const result = await api.post(url, data, headers);
    console.log(result);
    return result;
  }
  /**
   *
   * @param {*} url
   * @param {*} data
   * @returns
   */
  async put(url, data) {
    const result = await api.put(url, data, headers);
    console.log(result);
    return result;
  }
  /**
   *
   * @param {*} url
   * @returns
   */
  async delete(url) {
    const result = await api.delete(url, headers);
    console.log(result);
    return result;
  }
}

export default new Api();
