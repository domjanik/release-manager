import { Box, Collapse, IconButton, TableRow } from "@mui/material";
import React from "react";
import { ReleaseListColumn, Release } from "../pages/ReleaseList";
import SmallTableCell from "./SmallTableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type ReleaseListRowProps = {
  row: Release;
  columns: ReleaseListColumn[];
};

export function ReleaseListRow({
  row,
  columns,
}: ReleaseListRowProps): JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover role="radio" tabIndex={-1}>
        {columns.map((column) => {
          let value;
          switch (column.id) {
            case "details":
              value = (
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              );
              break;
            case "date":
              value = row.publishedAtString;
              break;
            default:
              value = row[column.id];
              break;
          }
          return (
            <SmallTableCell
              sx={{
                display: {
                  md: "table-cell",
                  xs: column.mobileHidden ? "none" : "table-cell",
                },
              }}
              key={column.id}
              align={column.align}
            >
              {value}
            </SmallTableCell>
          );
        })}
      </TableRow>
      {open && (
        <TableRow>
          <SmallTableCell></SmallTableCell>
          <SmallTableCell colSpan={6}>
            {columns.map((column) => {
              let value;
              switch (column.id) {
                case "details":
                  value = null;
                  break;
                case "date":
                  value = null;
                  break;
                default:
                  value = row[column.id];
                  break;
              }
              return (
                <Box
                  sx={{
                    display: {
                      md: "none",
                      xs: column.mobileHidden ? "flex" : "none",
                    },
                  }}
                  key={column.id}
                >
                  {column.label}: {value}
                </Box>
              );
            })}
            <Box>Release Notes: </Box>
            <Box>{row.description || "Not available"}</Box>
          </SmallTableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}
