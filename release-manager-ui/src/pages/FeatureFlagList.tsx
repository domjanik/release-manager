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
  fetchFeatureFlags,
  selectors,
  setFilters,
  clearFilters,
} from "../store/featureFlag/slice";
import { AppDispatch, RootState } from "../store";
import { TableFooter } from "@mui/material";
import { TableControls } from "../components/FeatureFlagTableControls";
import { FeatureFlagListRow } from "../components/FeatureFlagListRow";
import { useQueryParams } from "../utils/useQueryParams";
import { FeatureFlag, TableFilters } from "../store/featureFlag/models";

export interface FeatureFlagListColumn {
  id:
    | "date"
    | "name"
    | "value"
    | "platform"
    | "geo"
    | "changedBy"
    | "details"
    | "sampling";

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
  },
  {
    id: "value",
    label: "Value",
    minWidth: 150,
    mobileHidden: true,
  },
  {
    id: "platform",
    label: "Platform",
    mobileHidden: true,
  },
  {
    id: "geo",
    label: "Geo",
    mobileHidden: true,
  },
  {
    id: "sampling",
    label: "Sampling",
    mobileHidden: true,
  },
  {
    id: "changedBy",
    label: "Changed By",
    minWidth: 170,
    mobileHidden: true,
  },
];

export function FeatureFlagLogList(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const users = useSelector((state: RootState) => state.featureFlags.userList);
  const variables = useSelector(
    (state: RootState) => state.featureFlags.variableList,
  );
  const geos = useSelector((state: RootState) => state.featureFlags.geoList);
  const platforms = useSelector(
    (state: RootState) => state.featureFlags.platformList,
  );

  const dispatch = useDispatch<AppDispatch>();
  const rows: FeatureFlag[] = useSelector(selectors.getFilteredFeatureFlagLogs);
  const filters: TableFilters = useSelector(selectors.getFilters);
  const { getQueryParams, setQueryParams } = useQueryParams();

  const setDefaultFilters = () => {
    const queryParams = getQueryParams() as TableFilters;
    if (JSON.stringify(queryParams) !== "") {
      const filters = {
        ...queryParams,
        fromDate: queryParams.fromDate
          ? new Date(queryParams.fromDate)
          : undefined,
        toDate: queryParams.toDate ? new Date(queryParams.toDate) : undefined,
      } as TableFilters;
      dispatch(setFilters(filters));
    }
  };

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(getQueryParams())) {
      setQueryParams(filters);
    }
  }, [filters]);

  useEffect(() => {
    setDefaultFilters();
    dispatch(fetchFeatureFlags());
    return () => {
      dispatch(clearFilters());
    };
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (filters: TableFilters) => {
    dispatch(setFilters(filters));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
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
