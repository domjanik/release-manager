import React from "react";
import { FeatureFlagListColumn, FeatureFlag } from "../pages/FeatureFlagList";
import { Box, IconButton, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SmallTableCell from "./SmallTableCell";

type FeatureFlagListRowProps = {
  row: FeatureFlag;
  columns: FeatureFlagListColumn[];
};
export function FeatureFlagListRow({
  row,
  columns,
}: FeatureFlagListRowProps): JSX.Element {
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
              value = row.changedAtString;
              break;
            case "value":
              const newValue = JSON.stringify(row.value);
              value =
                newValue.length > 20 ? newValue.slice(0, 20) + "..." : newValue;
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
                case "value":
                  return;
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
            <Box>
              New Value:
              <pre>{JSON.stringify(row.value) || "Not available"}</pre>
            </Box>
          </SmallTableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}
