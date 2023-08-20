import axiosApi from "./AxiosApi";

const CustomerApi = {
  getProfile: async (id) => {
    const url = `Accounts/GetCustomerByAccountId?id=${id}`;
    return axiosApi.get(url, id);
  },
  updateProfile: async (form) => {
    const url = "/Accounts/UpdateProfileOfCustomer";
    const headers = {
      accept: "text/plain",
      "Content-Type": "application/json",
    };
    return axiosApi.put(url, form, { headers: headers });
  },
};
export default CustomerApi;
