import axios from 'axios';

// const BASE_URL = 'https://phonebook-backend-276823.fly.dev/api/persons';

// const BASE_URL = 'http://localhost:3001/api/persons';

const BASE_URL = '/api/persons';

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then(response => response.data);
}

const create = (newPerson) => {
  const request = axios.post(BASE_URL, newPerson);
  return request.then(response => response.data);
}

const deleteRequest = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then(response => response.data);
}

const update = (id, name, number) => {
  const person = {name, number}
  const request = axios.put(`${BASE_URL}/${id}`, person);
  return request.then(response => response.data);
}

export default {getAll, create, deleteRequest, update}