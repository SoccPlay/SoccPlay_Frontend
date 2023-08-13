import axiosApi from "./AxiosApi";

const LandApi = {
  GetAllLand(data) {
    const url = "/Land/GetAllLand";
    return axiosApi.get(url, data);
  },
  //   Register(data) {
  //     const url = "/Admins/PostAdmin";
  //     return axiosApi.post(url, data);
  //   },
};
export default LandApi;
