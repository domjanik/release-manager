import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ReleaseList } from "./pages/ReleaseList";
import { FeatureFlagLogList } from "./pages/FeatureFlagLogList";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReleaseList />,
      },
      {
        path: "/feature-flags",
        element: <FeatureFlagLogList />,
      },
    ],
  },
]);
