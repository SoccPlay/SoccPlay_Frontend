import axiosApi from "./AxiosApi";

const PitchApi = {
  GetPitchByOwnerAndNameLand(ownerId, landId) {
    const url = `Pitch/GetPitchByOwnerAndNameLand?ownerId=${ownerId}&landId=${landId}`;
    return axiosApi.get(url, ownerId, landId);
  },
};
export default PitchApi;
