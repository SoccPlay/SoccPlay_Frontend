import axiosApi from "./AxiosApi";

const DashboardApi = {
  GetSummaryProfit: async (ownerId) => {
    const url = `Booking/GetSummary?ownerId=${ownerId}`;
    return axiosApi.get(url, ownerId);
  },

  GetSummaryBooking: async (ownerId) => {
    const url = `Booking/GetNumBooking?ownerId=${ownerId}`;
    return axiosApi.get(url, ownerId);
  },

  GetSummarypitch: async (ownerId) => {
    const url = `Pitch/GetNumPitch?ownerId=${ownerId}`;
    return axiosApi.get(url, ownerId);
  },

  GetSummaryByMonth: async (year, ownerId) => {
    const url = `Booking/GetSummryInYear?year=${year}&ownerId=${ownerId}`;
    return axiosApi.get(url, year, ownerId);
  },
};

export default DashboardApi;
