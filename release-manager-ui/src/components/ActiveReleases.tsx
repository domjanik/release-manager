import React, { useMemo, useState } from "react";
import { WidgetWindow } from "./WidgetWindow";
import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";
import { MenuItem, Select as MUISelect } from "@mui/material";
import SmallTableCell from "./SmallTableCell";
import { Release } from "../store/release/models";

type ActiveReleasesProps = {
  allReleases: Release[];
  platforms: string[];
  sx?: SxProps<Theme>;
};

type ActiveReleasesFilter = {
  onChange: (value: string) => void;
  options: string[];
};

function ActiveReleasesFilter({ onChange, options }: ActiveReleasesFilter) {
  const [platform, setPlatform] = useState<string>("UCP");
  const changedPlatform = (newPlatform: string) => {
    onChange(newPlatform);
    setPlatform(newPlatform);
  };
  return (
    <MUISelect
      variant="standard"
      value={platform}
      labelId="select-label"
      onChange={(ev) => changedPlatform(ev.target.value as string)}
      sx={{ minWidth: "100px" }}
    >
      {options?.map((option: string) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MUISelect>
  );
}

export interface ActiveReleasesColumn {
  id: "publishedAtString" | "projectName" | "publishedBy" | "version" | "geo";
  label: string;
  align?: "right" | "center" | "left";
}

const columns: ActiveReleasesColumn[] = [
  {
    id: "publishedAtString",
    label: "Date",
    align: "left",
  },
  {
    id: "projectName",
    label: "Project",
    align: "left",
  },
  {
    id: "publishedBy",
    label: "Published By",
    align: "center",
  },
  {
    id: "version",
    label: "Version",
    align: "center",
  },
  {
    id: "geo",
    label: "Geo",
    align: "center",
  },
];

export function ActiveReleases({
  allReleases,
  platforms,
  sx,
}: ActiveReleasesProps): JSX.Element {
  const [platform, setPlatform] = useState<string>("UCP");

  const filterReleases = (releases: Release[], platform: string) => {
    const activeReleases: {[key: string]: Release[]} = {};
    releases
        .filter((release) => {
          return !platform || release.platform === platform;
        })
        .sort((a: Release, b: Release) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .forEach((release: Release) => {
          if (!activeReleases[release.projectName]) {
            activeReleases[release.projectName] = [];
          }

          const activeReleasesForProject = activeReleases[release.projectName];
          if (
              activeReleasesForProject.filter(
                  (activeRelease) =>
                      (activeRelease.geo === "XX" || activeRelease.geo === release.geo) &&
                      activeRelease.platform === release.platform
              ).length === 0
          ) {
            activeReleasesForProject.push(release);
          }
        });

    return Object.keys(activeReleases)
        .map((projectName) => activeReleases[projectName])
        .flat();
  }

  const releases = useMemo(() => {
    return filterReleases(allReleases, platform);
  }, [platform, allReleases]);

  return (
    <WidgetWindow
      title="Active Releases"
      sx={sx}
      additionalOptions={
        <ActiveReleasesFilter onChange={setPlatform} options={platforms} />
      }
    >
      <TableContainer sx={{ width: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {releases.map((release: Release, index: number) => {
              return (
                <TableRow
                  hover
                  role="radio"
                  tabIndex={-1}
                  key={
                    release.projectName + "_" + release.version + "_" + index
                  }
                >
                  {columns.map((column) => {
                    const value = release[column.id as keyof typeof release];
                    return (
                      <SmallTableCell key={column.id} align={column.align}>
                        {value?.toString()}
                      </SmallTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </WidgetWindow>
  );
}
