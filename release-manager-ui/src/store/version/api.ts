import axios from "axios";
import { Version } from "./models";

function fetchVersions(): Promise<{ data: Version[] }> {
  return axios.get(`http://localhost:3001/version`);
}

const versionApi = {
  fetchVersions: fetchVersions,
};

export default versionApi;
