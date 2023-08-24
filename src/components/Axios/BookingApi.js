import axiosApi from "./AxiosApi";

const BookingApi = {
  CreateBooking: async (form) => {
    const url = `Booking/CreateBooking_v3`;
    return axiosApi.post(url, form);
  },
  Calculator: async (form) => {
    // const url = `/Price/Calculator`;
    return axiosApi.post("Price/Calculator", form);
  },
  GetAllBookingByOwnerId: async (id) => {
    return axiosApi.get(`Booking/GetAllBookingByOwnerId_v2?id=${id}`);
  },
  GetBookingById: async (id) => {
    return axiosApi.get(`Booking/GetBookingById?id=${id}`);
  },
};

export const getAllBooking = async (id) => {
  try {
    const response = await axiosApi.get("/Booking/GetAllBookingByCustomerId", {
      params: {
        id,
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
