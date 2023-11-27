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
import { fetchVersions, selectors, setFilters } from "../store/versionsSlice";
import { RootState } from "../store";
import { TableFooter } from "@mui/material";
import { VersionListRow } from "../components/VersionListRow";
import { Version } from "../components/Versions";
import {
  TableControls,
  TableFilters,
} from "../components/VersionTableControls";

export interface VersionListColumn {
  id: "date" | "projectName" | "version" | "createdBy" | "details" | "isActive";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  mobileHidden?: boolean;
}

const columns: VersionListColumn[] = [
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
    id: "createdBy",
    label: "Created By",
    minWidth: 170,
    align: "center",
    mobileHidden: true,
  },
  {
    id: "isActive",
    label: "Is active",
    minWidth: 170,
    align: "center",
    mobileHidden: true,
  },
];

export function VersionList(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const users = useSelector((state: RootState) => state.release.userList);
  const projects = useSelector((state: RootState) => state.release.projectList);
  const geos = useSelector((state: RootState) => state.release.geoList);
  const platforms = useSelector(
    (state: RootState) => state.release.platformList
  );

  const dispatch = useDispatch<any>();
  const rows: Version[] = useSelector(selectors.getFilteredVersions);
  const filters: TableFilters = useSelector(selectors.getFilters);

  useEffect(() => {
    dispatch(fetchVersions());
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
                  <VersionListRow
                    columns={columns}
                    row={row}
                    key={row.projectName + "_" + row.createdAtString + index}
                  ></VersionListRow>
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
