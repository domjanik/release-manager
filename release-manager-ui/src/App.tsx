import * as React from "react";
import { Grid } from "@mui/material";
import { Navigation } from "./components/Navigation";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Grid
      container
      sx={{ height: "100vh", minWidth: "320px", overflow: "hidden" }}
    >
      <Grid
        item
        sm={2}
        sx={{
          flex: "1 1 auto",
        }}
      >
        <Navigation />
      </Grid>
      <Grid item sm={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
