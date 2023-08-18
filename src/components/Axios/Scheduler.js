import axiosApi from "./AxiosApi";

export const getScheduler = async (landId, date, size) => {
    try {
        const response = await axiosApi.get("/Pitch/GetPitchSchedule", {
            params: {
                landId,
                date,
                size,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Failed to fetch schedule: ", error);
    }
};
