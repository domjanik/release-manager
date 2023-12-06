import axios from "axios";
import { Release } from "./models";

function fetchRelease(): Promise<{ data: Release[] }> {
  return axios.get(`http://localhost:3001/releases`);
}

const api = {
  fetchRelease,
};

export default api;
