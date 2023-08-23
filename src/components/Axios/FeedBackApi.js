import axiosApi from "./AxiosApi";

export const getFeedBackByLandId = async (landId) => {
    const url = `/FeedBack/GetFeedBackByLandId?id=${landId}`;
    return axiosApi.get(url);
};

export const createFeedBack = async (data) => {
    const url = `/FeedBack/CreateFeedBack`;
    return axiosApi.post(url, data);
};
