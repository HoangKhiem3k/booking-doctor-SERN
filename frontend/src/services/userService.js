import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
export { handleLoginApi, getAllUsers, createNewUserService };
