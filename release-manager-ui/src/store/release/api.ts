import axios from "axios";
import { Release } from "./models";
import { backendUrl } from "../../utils/consts";

function fetchRelease(): Promise<{ data: Release[] }> {
  return axios.get(`http://${backendUrl}/release`);
}

const api = {
  fetchRelease,
};

export default api;
