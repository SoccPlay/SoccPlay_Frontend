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
  GetLandByOwner(id) {
    const url = `Land/GetLandByOwner?OwnerId=${id}`;
    return axiosApi.get(url, id);
  },
  GetLandByLocationandNameGround(location, name) {
    const url = `Land/SearchLand?location=${location}&landName=${name}`;
    return axiosApi.get(url, location, name);
  },
  GetLandByLocation(location) {
    const url = `Land/SearchLandByLocation?location=${location}`;
    return axiosApi.get(url, location);
  },
  GetLand(location, landName) {
    let url = `Land/SearchLand?`;

    if (location) {
      url += `location=${location}`;
    }

    if (landName) {
      if (url.endsWith("?")) {
        url += `landName=${landName}`;
      } else {
        url += `&landName=${landName}`;
      }
    }

    return axiosApi.get(url);
  },
  CreateLands: async (form) => {
    const url = `Land/CreateLand`;
    return axiosApi.post(url, form);
  },
  CreatePitch: async (form) => {
    const url = `Pitch/CreatePitch`;
    return axiosApi.post(url, form);
  },
  CreatePrice: async (form) => {
    const url = `Price/CreatePrice`;
    return axiosApi.post(url, form);
  },
  UploadImage: async (form) => {
    const url = `File/Add`;
    return axiosApi.post(url, form);
  },
};
export default LandApi;
