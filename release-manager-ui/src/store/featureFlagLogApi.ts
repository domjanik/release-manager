import axios from "axios";
import { FeatureFlagLog } from "../pages/FeatureFlagLogList";

function fetchRelease(): Promise<{ data: FeatureFlagLog[] }> {
  return axios.get(`http://localhost:3001/feature-flag-log`);
}

function fetchReleaseMock(): Promise<{ data: FeatureFlagLog[] }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            platform: "UCP",
            name: "aeLoader",
            geo: "BY",
            sampling: 100,
            changedBy: "Test User",
            changedAt: new Date(),
            changedAtString: "",
            value: true,
          },
          {
            platform: "UCP",
            name: "aeLoader",
            geo: "BY",
            sampling: 100,
            changedBy: "Test User",
            changedAt: new Date(),
            changedAtString: "",
            value: true,
          },
        ],
      });
    }, 1000);
  });
}

const releaseApi = {
  fetchRelease,
  fetchReleaseMock,
};

export default releaseApi;
