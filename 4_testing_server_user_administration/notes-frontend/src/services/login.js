import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/login'

const login = async (credentials) => {
  const response = await axios.post(BASE_URL, credentials)
  return response.data
}

export default { login }