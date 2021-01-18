import axios from "axios"

const instance = axios.create({
  baseURL: 'https://kanbancoder-ical10.herokuapp.com',
  timeout: 1000
});

export default instance
