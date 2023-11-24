import axios from "axios";
import { Version } from "../components/Versions";

function fetchVersions(): Promise<{ data: Version[] }> {
  return axios.get(`http://localhost:3001/version`);
}

const versionApi = {
  fetchVersions: fetchVersions,
};

export default versionApi;
