import axios from 'axios';
const BASE_URL = 'http://localhost:3001/notes';

const getAll = () => {
  const request = axios.get(BASE_URL);
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true, 
  }
  return request.then(response => response.data.concat(nonExisting));
}

const create = newObject => {
  const request = axios.post(BASE_URL, newObject);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject)
  return request.then(response => response.data);
}

export default { getAll, create, update };