import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ReleaseList } from "./pages/ReleaseList";
import { FeatureFlagLogList } from "./pages/FeatureFlagList";
import { Dashboard } from "./pages/Dashboard";
import { VersionList } from "./pages/VersionList";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/releases",
        element: <ReleaseList />,
      },
      {
        path: "/feature-flags",
        element: <FeatureFlagLogList />,
      },
      {
        path: "/versions",
        element: <VersionList />,
      },
    ],
  },
]);
