import axiosApi from "./AxiosApi";

///api/Booking/GetBookingById
export const getInvoiceByBookingId = async (bookingId) => {
  const url = `/Booking/GetBookingById?id=${bookingId}`;
  return axiosApi.get(url);
};
