import axiosApi from "./AxiosApi";

const AuthenApi = {
  Login(data) {
    const url = "/Authentication/Login";
    return axiosApi.post(url, data);
  },
  Register(data) {
    const url = "/Admins/PostAdmin";
    return axiosApi.post(url, data);
  },
};
export default AuthenApi;
