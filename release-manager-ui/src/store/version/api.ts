import axios from "axios";
import { Version } from "./models";
import { backendUrl } from "../../utils/consts";

function fetchVersions(): Promise<{ data: Version[] }> {
  return axios.get(`http://${backendUrl}/version`);
}

const versionApi = {
  fetchVersions: fetchVersions,
};

export default versionApi;
