import { Box } from "@mui/material";
import React from "react";
import { SearchInput } from "./SearchInput";
import { Spacings } from "../consts";
import { Select } from "./Select";
import { TableFilters } from "../store/featureFlagSlice";
import DatePicker from "./DatePicker";

type TableControlsProps = {
  filters: TableFilters;
  onFilterChange: (filters: TableFilters) => void;
  users: string[];
  variables: string[];
  platforms: string[];
  geos: string[];
};

export function TableControls({
  onFilterChange,
  filters,
  users,
  platforms,
  variables,
  geos,
}: TableControlsProps): JSX.Element {
  const changedFilters = (changedFilter: Partial<TableFilters>) => {
    const mergedFilters = { ...filters, ...changedFilter };
    onFilterChange(mergedFilters);
  };

  return (
    <Box
      sx={{
        display: {
          md: "flex",
          xs: "none",
        },
        justifyContent: "space-between",
        paddingY: Spacings.SMALL,
        marginTop: Spacings.SMALL,
        borderBottom: "1px solid black",
      }}
    >
      <SearchInput
        value={filters.search}
        onChange={(search: string) => {
          changedFilters({ search });
        }}
      />
      <DatePicker
        value={filters.fromDate}
        label="From"
        onChange={(fromDate: Date | null) =>
          fromDate && changedFilters({ fromDate })
        }
      />
      <DatePicker
        value={filters.toDate}
        label="To"
        onChange={(toDate: Date | null) => toDate && changedFilters({ toDate })}
      />
      <Select
        value={filters.userFilter}
        options={users}
        allOptionLabel="All Users"
        onChange={(selectedUser: string) => {
          changedFilters({ userFilter: selectedUser });
        }}
        placeholder="User"
      />
      <Select
        value={filters.variableFilter}
        options={variables}
        allOptionLabel="All Variables"
        onChange={(selectedVariable: string) => {
          changedFilters({ variableFilter: selectedVariable });
        }}
        placeholder="Project"
      />
      <Select
        value={filters.platformFilter}
        options={platforms}
        allOptionLabel="All Platforms"
        onChange={(selectedPlatform: string) => {
          changedFilters({ platformFilter: selectedPlatform });
        }}
        placeholder="Platform"
      />
      <Select
        value={filters.geoFilter}
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
