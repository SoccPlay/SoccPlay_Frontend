import axiosApi from "./AxiosApi";

const CustomerApi = {
    getProfile: async (id) => {
        const url = `Accounts/GetCustomerByAccountId?id=${id}`;
        return axiosApi.get(url, id);
    },
    updateProfile: async (values) => {
        const url = "/Accounts/UpdateProfileOfCustomer";
        return axiosApi.put(url, {
            ...values,
        });
    },
};
export default CustomerApi;
