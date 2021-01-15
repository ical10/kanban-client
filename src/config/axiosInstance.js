import axios from "axios"

const instance = axios.create({
  //baseURL: 'http://localhost:5001',
  baseURL: 'https://git.heroku.com/kanbancoder-ical10.git',
  timeout: 1000
});

export default instance
