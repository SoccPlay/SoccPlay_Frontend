import axiosApi from "./AxiosApi";

const BookingApi = {
  CreateBooking: async (form) => {
    const url = `Booking/CreateBooking_v2`;
    return axiosApi.post(url, form);
  },
};
export default BookingApi;
