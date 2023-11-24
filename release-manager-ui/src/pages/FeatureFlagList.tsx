import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  TableFilters,
  fetchFeatureFlags,
  selectors,
  setFilters,
} from "../store/featureFlagSlice";
import { RootState } from "../store";
import { TableFooter } from "@mui/material";
import { TableControls } from "../components/FeatureFlagTableControls";
import { FeatureFlagListRow } from "../components/FeatureFlagListRow";

export interface FeatureFlagListColumn {
  id: "date" | "name" | "value" | "platform" | "geo" | "changedBy" | "details";

  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  mobileHidden?: boolean;
}

const columns: FeatureFlagListColumn[] = [
  { id: "details", label: "", minWidth: 35, align: "center" },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "left",
  },
  {
    id: "name",
    label: "Variable",
    minWidth: 170,
    align: "center",
  },
  {
    id: "value",
    label: "Value",
    minWidth: 150,
    align: "center",
    mobileHidden: true,
  },
  {
    id: "platform",
    label: "Platform",
    align: "center",
    mobileHidden: true,
  },
  {
    id: "geo",
    label: "Geo",
    align: "center",
    mobileHidden: true,
  },
  {
    id: "changedBy",
    label: "Changed By",
    minWidth: 170,
    align: "center",
    mobileHidden: true,
  },
];

export interface FeatureFlag {
  platform: string;
  value: string | boolean | object | number;
  name: string;
  geo: string;
  sampling: number;
  changedBy: string;
  changedAt: Date;
  changedAtString: string;
}

export function FeatureFlagLogList(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const users = useSelector((state: RootState) => state.featureFlags.userList);
  const variables = useSelector(
    (state: RootState) => state.featureFlags.variableList
  );
  const geos = useSelector((state: RootState) => state.featureFlags.geoList);
  const platforms = useSelector(
    (state: RootState) => state.featureFlags.platformList
  );

  const dispatch = useDispatch<any>();
  const rows: FeatureFlag[] = useSelector(selectors.getFilteredFeatureFlagLogs);
  const filters: TableFilters = useSelector(selectors.getFilters);

  useEffect(() => {
    dispatch(fetchFeatureFlags());
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (filters: TableFilters) => {
    dispatch(setFilters(filters));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ height: "100vh", overflow: "hidden" }}>
      <TableControls
        onFilterChange={handleFilterChange}
        filters={filters}
        users={users}
        variables={variables}
        geos={geos}
        platforms={platforms}
      />
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    display: {
                      md: "table-cell",
                      sm: column.mobileHidden ? "none" : "table-cell",
                    },
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <FeatureFlagListRow
                    columns={columns}
                    row={row}
                    key={row.name + "_" + row.changedAtString + index}
                  ></FeatureFlagListRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={10}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
