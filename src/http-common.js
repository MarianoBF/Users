import axios from "axios";

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default axios.create({
  baseURL: "https://reqres.in/api",
  // baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});
