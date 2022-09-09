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
const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id,
    },
  });
};
const editUserService = (data) => {
  return axios.put("/api/update-user", data);
};

const getAllcodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllcodeService,
};
