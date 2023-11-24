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
import { fetchReleases, selectors, setFilters } from "../store/releaseSlice";
import { RootState } from "../store";
import { TableFooter } from "@mui/material";
import {
  TableControls,
  TableFilters,
} from "../components/ReleaseTableControls";
import { ReleaseListRow } from "../components/ReleaseListRow";

export interface ReleaseListColumn {
  id:
    | "date"
    | "projectName"
    | "version"
    | "geo"
    | "publishedBy"
    | "details"
    | "platform";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  mobileHidden?: boolean;
}

const columns: ReleaseListColumn[] = [
  { id: "details", label: "", minWidth: 35, align: "center" },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "left",
  },
  {
    id: "projectName",
    label: "Project",
    minWidth: 170,
    align: "center",
  },
  {
    id: "version",
    label: "Version",
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
    id: "publishedBy",
    label: "Published By",
    minWidth: 170,
    align: "center",
    mobileHidden: true,
  },
];

export interface Release {
  projectName: string;
  version: string;
  geo: string;
  publishedBy: string;
  platform: string;
  publishedAt: Date;
  publishedAtString: string;
  description?: string;
}

export function ReleaseList(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const users = useSelector((state: RootState) => state.release.userList);
  const projects = useSelector((state: RootState) => state.release.projectList);
  const geos = useSelector((state: RootState) => state.release.geoList);
  const platforms = useSelector(
    (state: RootState) => state.release.platformList
  );

  const dispatch = useDispatch<any>();
  const rows: Release[] = useSelector(selectors.getFilteredReleases);
  const filters: TableFilters = useSelector(selectors.getFilters);

  useEffect(() => {
    dispatch(fetchReleases());
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
        projects={projects}
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
                      xs: column.mobileHidden ? "none" : "table-cell",
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
                  <ReleaseListRow
                    columns={columns}
                    row={row}
                    key={row.projectName + "_" + row.publishedAtString + index}
                  ></ReleaseListRow>
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
