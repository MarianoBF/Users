import axios from "axios";

export default axios.create({
  baseURL: "https://reqres.in/api",
  // baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});
