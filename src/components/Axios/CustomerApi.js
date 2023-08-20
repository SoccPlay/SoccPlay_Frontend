import axiosApi from "./AxiosApi";

export const updateProfile = async (form) => {
    try {
        const response = await axiosApi.put(
            "/Accounts/UpdateProfileOfCustomer",
            form
        );
        return response.data;
    } catch (error) {
        console.log("Failed to fetch schedule: ", error);
    }
};

export const getProfile = async (id) => {
    try {
        const response = await axiosApi.get(
            `Accounts/GetCustomerByAccountId?id=${id}`
        );
        return response.data;
    } catch (error) {
        console.log("Failed to fetch schedule: ", error);
    }
};
