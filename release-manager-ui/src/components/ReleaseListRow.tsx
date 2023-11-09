import { Collapse, IconButton, TableRow } from "@mui/material";
import React from "react";
import { Column, Release } from "../pages/ReleaseList";
import SmallTableCell from "./SmallTableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type ReleaseListRowProps = {
  row: Release;
  columns: Column[];
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
            <SmallTableCell key={column.id} align={column.align}>
              {value}
            </SmallTableCell>
          );
        })}
      </TableRow>
      {open && (
        <TableRow>
          <SmallTableCell></SmallTableCell>
          <SmallTableCell colSpan={6}>
            <div>Release Notes: </div>
            <div>{row.description || "Not available"}</div>
          </SmallTableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}
