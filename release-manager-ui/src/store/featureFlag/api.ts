import axios from "axios";
import { FeatureFlag } from "./models";
import { backendUrl } from "../../utils/consts";

function fetchFeatureFlags(): Promise<{ data: FeatureFlag[] }> {
  //return axios.get(`http://localhost:3001/feature-flag-log`);
  return axios.get(`http://${backendUrl}/feature-flag`);
}

const api = {
  fetchFeatureFlag: fetchFeatureFlags,
};

export default api;
