import axiosApi from "./AxiosApi";

export const search = async (location, size, rate, min = 0, max = 300000) => {
    const url = `/Land/Filter`;
    return axiosApi.get(url, {
        params: {
            location: location,
            size: size,
            rate: rate,
            min: min,
            max: max,
        },
    });
};
