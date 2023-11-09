import { Box } from "@mui/material";
import React from "react";
import { SearchInput } from "./SearchInput";
import { Spacings } from "../consts";
import { Select } from "./Select";

export type TableFilters = {
  search: string;
  userFilter: string;
  projectFilter: string;
  geoFilter: string;
  platformFilter: string;
};

type TableControlsProps = {
  filters: TableFilters;
  onFilterChange: (filters: TableFilters) => void;
  users: string[];
  projects: string[];
  platforms: string[];
  geos: string[];
};

export function TableControls({
  onFilterChange,
  filters,
  users,
  platforms,
  projects,
  geos,
}: TableControlsProps): JSX.Element {
  const changedFilters = (changedFilter: Partial<TableFilters>) => {
    const mergedFilters = { ...filters, ...changedFilter };
    onFilterChange(mergedFilters);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingY: Spacings.SMALL,
        marginTop: Spacings.SMALL,
        borderBottom: "1px solid black",
      }}
    >
      <SearchInput
        onChange={(search: string) => {
          changedFilters({ search });
        }}
      />
      <Select
        options={users}
        allOptionLabel="All Users"
        onChange={(selectedUser: string) => {
          changedFilters({ userFilter: selectedUser });
        }}
        placeholder="User"
      />
      <Select
        options={projects}
        allOptionLabel="All Projects"
        onChange={(selectedProject: string) => {
          changedFilters({ projectFilter: selectedProject });
        }}
        placeholder="Project"
      />
      <Select
        options={platforms}
        allOptionLabel="All Platforms"
        onChange={(selectedPlatform: string) => {
          changedFilters({ platformFilter: selectedPlatform });
        }}
        placeholder="Platform"
      />
      <Select
        options={geos}
        allOptionLabel="All Geos"
        onChange={(geo: string) => {
          changedFilters({ geoFilter: geo });
        }}
        placeholder="Geo"
      />
    </Box>
  );
}
