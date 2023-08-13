import axiosApi from "./AxiosApi";

const LandApi = {
  GetAllLand(data) {
    const url = "/Land/GetAllLand";
    return axiosApi.get(url, data);
  },
  GetLandById(id) {
    const url = `https://localhost:7186/api/Land/GetLandById?landId=${id}`;
    return axiosApi.get(url, id);
  },
};
export default LandApi;
