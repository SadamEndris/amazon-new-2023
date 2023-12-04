import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "http://127.0.0.1:5500",
  // baseURL: "https://sa-amazon-backend.cyclic.app",
});

// const instance = axios.create({
//   baseURL: '',
//   // withCredentials: false,
//   // headers: {
//   //   'Access-Control-Allow-Origin': '*',
//   //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//   // },
// })

export default instance;
