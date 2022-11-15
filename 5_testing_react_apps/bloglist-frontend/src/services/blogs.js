import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/blogs'

let _token = null

const setToken = (newToken) => { _token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (data) => {
  const config = {
    headers: { Authorization: _token },
  }

  console.log(baseUrl, data, config)
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const updateBlog = async (blogId, data) => {
  const url = `${baseUrl}/${blogId}`
  console.log(url, data)
  const response = await axios.put(url, data)
  return response.data
}

const deleteBlog = async (blogId, user) => {
  const url = `${baseUrl}/${blogId}`
  console.log(url, user)
  await axios.delete(url, user)
}

export default {
  getAll, create, setToken, updateBlog, deleteBlog,
}
