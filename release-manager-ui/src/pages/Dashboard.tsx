import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ActiveReleases } from "../components/ActiveReleases";
import { LastChanges } from "../components/LastChanges";
import { Spacings } from "../consts";
import { fetchReleases } from "../store/releaseSlice";
import { fetchFeatureFlags } from "../store/featureFlagSlice";
import { Versions } from "../components/Versions";
import { fetchVersions } from "../store/versionsSlice";

export function Dashboard(): JSX.Element {
  const dispatch = useDispatch<any>();
  const platforms = useSelector(
    (state: RootState) => state.release.platformList
  );
  const releases = useSelector((state: RootState) => state.release.releases);
  const featureFlags = useSelector(
    (state: RootState) => state.featureFlags.featureFlags
  );
  const versions = useSelector((state: RootState) => state.version.versions);

  useEffect(() => {
    dispatch(fetchVersions());
    dispatch(fetchReleases());
    dispatch(fetchFeatureFlags());
  }, []);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        width: { md: "100%", xs: "100vw" },
        height: "100vh",
        overflow: { md: "hidden", xs: "auto" },
        paddingX: { md: Spacings.MEDIUM, xs: Spacings.SMALL },
        paddingY: { xs: Spacings.MEDIUM, md: 0 },
        marginY: { xs: Spacings.MEDIUM, md: 0 },
      }}
    >
      <Grid item md={6} xs={12}>
        <ActiveReleases
          allReleases={releases}
          platforms={platforms}
          sx={{ height: "100%", maxWidth: "100vw" }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Versions
          versions={versions}
          sx={{ height: "100%", maxWidth: "100vw" }}
        />
      </Grid>
      <Grid item xs={12}>
        <LastChanges
          allReleases={releases}
          allFeatureFlags={featureFlags}
          sx={{
            maxWidth: "100vw",
            height: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
}
