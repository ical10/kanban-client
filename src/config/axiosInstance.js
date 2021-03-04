import axios from "axios"

const instance = axios.create({
  baseURL: 'https://kanbancoder-ical10.herokuapp.com'
});

export default instance
