import axiosApi from "./AxiosApi";

const LandApi = {
  GetAllLand(data) {
    const url = "/Land/GetAllLand";
    return axiosApi.get(url, data);
  },
  GetLandById(id) {
    const url = `Land/GetLandById?landId=${id}`;
    return axiosApi.get(url, id);
  },
  GetLandByLocationandNameGround(location, name) {
    const url = `Land/SearchLand?location=${location}&landName=${name}`;
    return axiosApi.get(url, location, name);
  },
};
export default LandApi;
