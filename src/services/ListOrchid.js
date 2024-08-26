import axios from 'axios';

const baseURL = "https://667152aae083e62ee43b0d81.mockapi.io/api/orchids";

const baseURL2 = "https://667152aae083e62ee43b0d81.mockapi.io/api/message";

const fetchAllOrchid = () => {
  return axios.get(baseURL);
}

const fetchAllMess = () => {
  return axios.get(baseURL2);
}

const deleteMess = (id) => {
  return axios.delete(`${baseURL2}/${id}`);
}

const fetchOrchidById = (id) => {
  return axios.get(`${baseURL}/${id}`);
}

const addOrchid = (orchid) => {
  return axios.post(baseURL, orchid);
}

const updateOrchid = (id, updatedOrchid) => {
  return axios.put(`${baseURL}/${id}`, updatedOrchid);
}

const deleteOrchid = (id) => {
  return axios.delete(`${baseURL}/${id}`);
}

export {
  fetchAllOrchid,
  fetchAllMess,
  deleteMess,
  fetchOrchidById,
  addOrchid,
  updateOrchid,
  deleteOrchid
};
