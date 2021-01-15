import axios from "axios"

const instance = axios.create({
  //baseURL: 'http://localhost:5001',
  baseURL: 'https://kanbancoder-ical10.herokuapp.com/',
  timeout: 1000
});

export default instance
