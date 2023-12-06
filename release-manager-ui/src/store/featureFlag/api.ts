import axios from "axios";
import { FeatureFlag } from "./models";

function fetchFeatureFlags(): Promise<{ data: FeatureFlag[] }> {
  return axios.get(`http://localhost:3001/feature-flag-log`);
}

const api = {
  fetchFeatureFlag: fetchFeatureFlags,
};

export default api;
