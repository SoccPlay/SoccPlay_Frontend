import axiosApi from "./AxiosApi";

const AuthenApi = {
  Login(data) {
    const url = "/Authentication/Login";
    return axiosApi.post(url, data);
  },
  Register(data) {
    const url = "/Register/PostCustomer";
    return axiosApi.post(url, data);
  },
  GetCustomerByAccountId(data) {
    const url = `Accounts/GetCustomerByAccountId?id=${data}`;
    return axiosApi.get(url, data);
  },
};
export default AuthenApi;
