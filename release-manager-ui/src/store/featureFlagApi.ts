import axios from "axios";
import { FeatureFlag } from "../pages/FeatureFlagList";

function fetchFeatureFlags(): Promise<{ data: FeatureFlag[] }> {
  return axios.get(`http://localhost:3001/feature-flag-log`);
}

function fetchFeatureFlagsMock(): Promise<{ data: FeatureFlag[] }> {
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

const featureFlagApi = {
  fetchFeatureFlag: fetchFeatureFlags,
  fetchFeatureFlagMock: fetchFeatureFlagsMock,
};

export default featureFlagApi;
