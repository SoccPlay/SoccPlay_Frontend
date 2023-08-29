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

  GetSummaryBookingByLandId: async (landId) => {
    const url = `Booking/GetNumBookingByLand?landId=${landId}`;
    return axiosApi.get(url, landId);
  },

  GetSummaryProfitByLandId: async (landId) => {
    const url = `Booking/GetSummaryByLand?landId=${landId}`;
    return axiosApi.get(url, landId);
  },

  GetSummarypitchByLandId: async (landId) => {
    const url = `Pitch/GetNumPitchByLand?landId=${landId}`;
    return axiosApi.get(url, landId);
  },

  GetSummaryByMonthAndLandId: async (year, landId) => {
    const url = `Booking/GetSummryInYearByLand?year=${year}&landId=${landId}`;
    return axiosApi.get(url, year, landId);
  },
};

export default DashboardApi;
