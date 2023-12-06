import React, { useMemo } from "react";
import { WidgetWindow } from "./WidgetWindow";
import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Theme } from "@mui/system";
import SmallTableCell from "./SmallTableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Version } from "../store/version/models";

type versionsProps = {
  versions: Version[];
  sx?: SxProps<Theme>;
};

export interface ActiveReleasesColumn {
  id: "createdAtString" | "projectName" | "createdBy" | "version" | "isActive";
  label: string;
  align?: "right" | "center" | "left";
  mobileHidden?: boolean;
}

const columns: ActiveReleasesColumn[] = [
  {
    id: "createdAtString",
    label: "Date",
    align: "left",
  },
  {
    id: "projectName",
    label: "Project",
    align: "left",
  },
  {
    id: "createdBy",
    label: "Created By",
    align: "center",
    mobileHidden: true,
  },
  {
    id: "version",
    label: "Version",
    align: "center",
  },
  {
    id: "isActive",
    label: "Is Active",
    align: "center",
  },
];

export function Versions({ sx, versions }: versionsProps): JSX.Element {
  const VERSIONS_LIMIT = 4;

  const limitedVersions = useMemo(
    () => versions.slice(0, VERSIONS_LIMIT),
    [versions],
  );

  return (
    <WidgetWindow sx={sx} title="Recent Versions">
      <TableContainer>
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
            {limitedVersions.map((version: Version, index: number) => {
              return (
                <TableRow
                  hover
                  role="radio"
                  tabIndex={-1}
                  key={
                    version.projectName + "_" + version.version + "_" + index
                  }
                >
                  {columns.map((column) => {
                    const value = version[column.id as keyof typeof version];
                    if (column.id === "isActive") {
                      return (
                        <SmallTableCell key={column.id} align="center">
                          {version.releases.length > 0 ? (
                            <CheckCircleIcon />
                          ) : (
                            <HighlightOffIcon />
                          )}
                        </SmallTableCell>
                      );
                    }
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
