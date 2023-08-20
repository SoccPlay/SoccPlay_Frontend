import axiosApi from "./AxiosApi";

const BookingApi = {
  CreateBooking: async (form) => {
    const url = `Booking/CreateBooking_v3`;
    return axiosApi.post(url, form);
  },
};

export const getAllBooking = async (customerId) => {
  try {
    const response = await axiosApi.get("/Booking/GetAllBookingByCustomerId", {
      params: {
        customerId,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to fetch schedule: ", error);
  }
};

export const deleteBooking = async (id) => {
  try {
    await axiosApi.delete(`/Booking/CancelBooking?id=${id}`);
  } catch (error) {
    console.log("Failed to fetch schedule: ", error);
  }
};

export default BookingApi;
