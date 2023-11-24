import React, { useMemo } from "react";
import { WidgetWindow } from "./WidgetWindow";
import { FeatureFlag } from "../pages/FeatureFlagList";
import { Release } from "../pages/ReleaseList";
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
import SmallTableCell from "./SmallTableCell";

type LastChangesProps = {
  allReleases: Release[];
  allFeatureFlags: FeatureFlag[];
  sx?: SxProps<Theme>;
};

enum ChangeType {
  RELEASE = "Release",
  FEATURE_FLAG = "Feature Flag",
}

export interface LastChangesColumn {
  id: "dateAsString" | "type" | "changedBy" | "name" | "platform" | "geo";
  label: string;
  align?: "right" | "center" | "left";
}

const columns: LastChangesColumn[] = [
  {
    id: "dateAsString",
    label: "Date",
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    align: "left",
  },
  {
    id: "changedBy",
    label: "Changed By",
    align: "center",
  },
  {
    id: "name",
    label: "Short Description",
    align: "center",
  },
  {
    id: "platform",
    label: "Platform",
    align: "center",
  },
  {
    id: "geo",
    label: "Geo",
    align: "center",
  },
];

export function LastChanges({
  allReleases,
  allFeatureFlags,
  sx,
}: LastChangesProps): JSX.Element {
  const CHANGES_LIMIT = 10;
  const changeList = useMemo(() => {
    const lastReleases = allReleases.map((release) => {
      return {
        date: release.publishedAt,
        dateAsString: release.publishedAtString,
        changedBy: release.publishedBy,
        type: ChangeType.RELEASE,
        platform: release.platform,
        geo: release.geo,
        name: release.projectName + " - " + release.version,
      };
    });
    const latFeatureFlagChanges = allFeatureFlags.map(
      (featureFlag: FeatureFlag) => {
        return {
          changedBy: featureFlag.changedBy,
          date: featureFlag.changedAt,
          dateAsString: featureFlag.changedAtString,
          geo: featureFlag.geo,
          platform: featureFlag.platform,
          type: ChangeType.FEATURE_FLAG,
          name:
            featureFlag.name +
            " - " +
            (typeof featureFlag.value === "object"
              ? JSON.stringify(featureFlag.value).slice(0, 10) + "..."
              : featureFlag.value),
        };
      }
    );
    const changes = [...lastReleases, ...latFeatureFlagChanges]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, CHANGES_LIMIT);
    console.log("refresh!", changes);
    return changes;
  }, [allReleases, allFeatureFlags]);

  return (
    <WidgetWindow sx={sx} title="Last Changes">
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
            {changeList.map((change, index) => {
              return (
                <TableRow
                  hover
                  role="radio"
                  tabIndex={-1}
                  key={change.name + "_" + index}
                >
                  {columns.map((column) => {
                    let value = change[column.id as keyof typeof change];
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
