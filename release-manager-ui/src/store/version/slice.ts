import {
  PayloadAction,
  Slice,
  createAsyncThunk,
  createSlice,
  createAction,
} from "@reduxjs/toolkit";
import versionApi from "./api";
import { RootState } from "../index";
import { TableFilters, Version, VersionState } from "./models";

export const fetchVersions = createAsyncThunk<Version[]>(
  "versions/fetchVersions",
  async (_, { dispatch }): Promise<Version[]> => {
    const response = await versionApi.fetchVersions();
    const responseWithFixedDates = response.data
      .map((value: Version) => {
        value.createdAt = new Date(value.createdAt);
        value.createdAtString =
          value.createdAt.toLocaleDateString() +
          ", " +
          value.createdAt.toLocaleTimeString();
        return value;
      })
      .sort(
        (a: Version, b: Version) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      );

    const projects: string[] = [],
      users: string[] = [];
    responseWithFixedDates.forEach((value) => {
      if (!projects.includes(value.projectName)) {
        projects.push(value.projectName);
      }
      if (!users.includes(value.createdBy)) {
        users.push(value.createdBy);
      }
    });
    dispatch(setProjects(projects));
    dispatch(setUsers(users));

    return responseWithFixedDates;
  },
);

const initialState: VersionState = {
  versions: [],
  projectList: [],
  userList: [],
  filters: {
    search: "",
    userFilter: "",
    projectFilter: "",
    fromDate: undefined,
    toDate: undefined,
  },
};

export const versionSlice: Slice = createSlice({
  name: "version",
  initialState,
  reducers: {
    setFilters: (state: VersionState, action: PayloadAction<TableFilters>) => {
      state.filters = action.payload;
    },
    setProjects: (state: VersionState, action: PayloadAction<string[]>) => {
      state.projectList = action.payload;
    },
    setUsers: (state: VersionState, action: PayloadAction<string[]>) => {
      state.userList = action.payload;
    },
    clearFilters: (state: VersionState) => {
      state.filters = {
        search: "",
        userFilter: "",
        projectFilter: "",
        fromDate: undefined,
        toDate: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchVersions.fulfilled,
      (state: VersionState, action: PayloadAction<Version[]>) => {
        state.versions = action.payload;
      },
    );
    builder.addCase(fetchVersions.rejected, (state: VersionState) => {
      state.versions = [];
    });
  },
});

export const clearFilters = createAction("version/clearFilters");
export const setFilters = createAction<TableFilters>("version/setFilters");
export const setProjects = createAction<string[]>("version/setProjects");
export const setUsers = createAction<string[]>("version/setUsers");

const getFilteredVersions = (state: RootState) => {
  const items = state.version.versions;
  const allFilters = state.version.filters;
  const filters = Object.keys(allFilters)
    .filter((value: string) => {
      return (
        allFilters[value as keyof TableFilters] !== "" &&
        allFilters[value as keyof TableFilters] !== "all"
      );
    })
    .reduce((prevValue, currValue) => {
      return {
        ...prevValue,
        [currValue]: allFilters[currValue as keyof TableFilters],
      };
    }, {}) as Partial<TableFilters>;

  return applyFilters(items, filters);
};

const applyProjectFilter = (items: Version[], project: string) => {
  return items.filter((item) => {
    return item.projectName === project;
  });
};

const applySearch = (items: Version[], search: string) => {
  const searchValue = search.toLocaleLowerCase();
  return items.filter((item) => {
    return (
      item.projectName.toLocaleLowerCase().includes(searchValue) ||
      item.createdBy.toLocaleLowerCase().includes(searchValue) ||
      item.version.toLocaleLowerCase().includes(searchValue) ||
      item.description?.toLocaleLowerCase().includes(searchValue) ||
      item.createdAtString.toLocaleLowerCase().includes(searchValue)
    );
  });
};

const applyUserFilter = (items: Version[], user: string) => {
  return items.filter((item) => {
    return item.createdBy === user;
  });
};

const applyFromDateFilter = (items: Version[], fromDate: Date) => {
  return items.filter((item) => {
    const publishDate = new Date(
      item.createdAt.getUTCFullYear(),
      item.createdAt.getUTCMonth(),
      item.createdAt.getUTCDate(),
    );
    return publishDate >= fromDate;
  });
};

const applyToDateFilter = (items: Version[], toDate: Date) => {
  return items.filter((item) => {
    const publishDate = new Date(
      item.createdAt.getUTCFullYear(),
      item.createdAt.getUTCMonth(),
      item.createdAt.getUTCDate(),
    );
    return publishDate <= toDate;
  });
};

const applyFilters = (items: Version[], filters: Partial<TableFilters>) => {
  let filteredItems = items;
  if (filters.projectFilter) {
    filteredItems = applyProjectFilter(filteredItems, filters.projectFilter);
  }
  if (filters.userFilter) {
    filteredItems = applyUserFilter(filteredItems, filters.userFilter);
  }
  if (filters.search) {
    filteredItems = applySearch(filteredItems, filters.search);
  }
  if (filters.fromDate) {
    filteredItems = applyFromDateFilter(filteredItems, filters.fromDate);
  }
  if (filters.toDate) {
    filteredItems = applyToDateFilter(filteredItems, filters.toDate);
  }
  return filteredItems;
};

const getFilters = (state: RootState) => {
  return state.version.filters;
};

export default versionSlice.reducer;

export const selectors = { getFilteredVersions, getFilters };
