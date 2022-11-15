import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/notes'

let _token = null

const setToken = newToken => {
  _token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(response => {
    return response.data
  })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: _token },
  }
  console.log(BASE_URL, newObject, config)
  const response = await axios.post(BASE_URL, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }