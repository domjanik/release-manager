import { Box } from "@mui/material";
import React from "react";
import { SearchInput } from "./SearchInput";
import { Spacings } from "../consts";
import { Select } from "./Select";
import DatePicker from "./DatePicker";

export type TableFilters = {
  search: string;
  userFilter: string;
  projectFilter: string;
  fromDate?: Date;
  toDate?: Date;
};

type TableControlsProps = {
  filters: TableFilters;
  onFilterChange: (filters: TableFilters) => void;
  users: string[];
  projects: string[];
};

export function TableControls({
  onFilterChange,
  filters,
  users,
  projects,
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
        options={projects}
        allOptionLabel="All Projects"
        onChange={(selectedProject: string) => {
          changedFilters({ projectFilter: selectedProject });
        }}
        placeholder="Project"
      />
    </Box>
  );
}
