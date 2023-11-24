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
        onChange={(search: string) => {
          changedFilters({ search });
        }}
      />
      <DatePicker
        label="From"
        onChange={(fromDate: Date | null) =>
          fromDate && changedFilters({ fromDate })
        }
      />
      <DatePicker
        label="To"
        onChange={(toDate: Date | null) => toDate && changedFilters({ toDate })}
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
        options={variables}
        allOptionLabel="All Variables"
        onChange={(selectedVariable: string) => {
          changedFilters({ variableFilter: selectedVariable });
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
