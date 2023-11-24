import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import featureFlagApi from "./featureFlagApi";
import { RootState } from ".";
import { FeatureFlag } from "../pages/FeatureFlagList";

export interface FeatureFlagList {
  featureFlags: FeatureFlag[];
  filters: TableFilters;
  platformList: string[];
  variableList: string[];
  geoList: string[];
  userList: string[];
}

export type TableFilters = {
  search: string;
  userFilter: string;
  variableFilter: string;
  geoFilter: string;
  platformFilter: string;
  fromDate?: Date;
  toDate?: Date;
};

const initialState: FeatureFlagList = {
  featureFlags: [],
  platformList: [],
  variableList: [],
  geoList: [],
  userList: [],
  filters: {
    search: "",
    userFilter: "",
    variableFilter: "",
    platformFilter: "",
    geoFilter: "",
    fromDate: undefined,
    toDate: undefined,
  },
};

export const fetchFeatureFlags = createAsyncThunk(
  "featureFlags/fetchFeatureFlags",
  async (_, { dispatch }) => {
    const response = await featureFlagApi.fetchFeatureFlag();
    const responseWithFixedDates = response.data.map((value) => {
      value.changedAt = new Date(value.changedAt);
      value.changedAtString =
        value.changedAt.toLocaleDateString() +
        ", " +
        value.changedAt.toLocaleTimeString();
      return value;
    });
    const platforms: string[] = [],
      projects: string[] = [],
      geos: string[] = [],
      users: string[] = [];
    responseWithFixedDates.forEach((value) => {
      if (!platforms.includes(value.platform)) {
        platforms.push(value.platform);
      }
      if (!projects.includes(value.name)) {
        projects.push(value.name);
      }
      if (!geos.includes(value.geo)) {
        geos.push(value.geo);
      }
      if (!users.includes(value.changedBy)) {
        users.push(value.changedBy);
      }
    });
    dispatch(setPlatforms(platforms));
    dispatch(setVariables(projects));
    dispatch(setGeos(geos));
    dispatch(setUsers(users));

    return responseWithFixedDates;
  }
);

export const featureFlagSlice = createSlice({
  name: "featureFlag",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TableFilters>) => {
      state.filters = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<string[]>) => {
      state.platformList = action.payload;
    },
    setVariables: (state, action: PayloadAction<string[]>) => {
      state.variableList = action.payload;
    },
    setGeos: (state, action: PayloadAction<string[]>) => {
      state.geoList = action.payload;
    },
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.userList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeatureFlags.fulfilled, (state, action) => {
      state.featureFlags = action.payload;
    });
    builder.addCase(fetchFeatureFlags.rejected, (state) => {
      state.featureFlags = [];
    });
  },
});

export const { setFilters, setGeos, setPlatforms, setVariables, setUsers } =
  featureFlagSlice.actions;

const getFilteredFeatureFlags = (state: RootState) => {
  const items = state.featureFlags.featureFlags;
  const allFilters = state.featureFlags.filters;
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
    }, {});

  return applyFilters(items, filters);
};

const applyPlatformFilter = (items: FeatureFlag[], platform: string) => {
  return items.filter((item) => {
    return item.platform === platform;
  });
};

const applyVariableFilter = (items: FeatureFlag[], project: string) => {
  return items.filter((item) => {
    return item.name === project;
  });
};

const applyFromDateFilter = (items: FeatureFlag[], fromDate: Date) => {
  return items.filter((item) => {
    const changeDate = new Date(
      item.changedAt.getUTCFullYear(),
      item.changedAt.getUTCMonth(),
      item.changedAt.getUTCDate()
    );
    return changeDate >= fromDate;
  });
};

const applyToDateFilter = (items: FeatureFlag[], toDate: Date) => {
  return items.filter((item) => {
    const changeDate = new Date(
      item.changedAt.getUTCFullYear(),
      item.changedAt.getUTCMonth(),
      item.changedAt.getUTCDate()
    );
    return changeDate <= toDate;
  });
};

const applySearch = (items: FeatureFlag[], search: string) => {
  const searchValue = search.toLocaleLowerCase();
  return items.filter((item) => {
    return (
      item.platform.toLocaleLowerCase().includes(searchValue) ||
      item.name.toLocaleLowerCase().includes(searchValue) ||
      item.geo.toLocaleLowerCase().includes(searchValue) ||
      item.changedBy.toLocaleLowerCase().includes(searchValue) ||
      item.value.toString().toLocaleLowerCase().includes(searchValue) ||
      item.changedAtString.toLocaleLowerCase().includes(searchValue)
    );
  });
};

const applyGeoFilter = (items: FeatureFlag[], geo: string) => {
  return items.filter((item) => {
    return geo === "XX" || item.geo === geo || item.geo === "XX";
  });
};

const applyUserFilter = (items: FeatureFlag[], user: string) => {
  return items.filter((item) => {
    return item.changedBy === user;
  });
};

const applyFilters = (items: FeatureFlag[], filters: Partial<TableFilters>) => {
  let filteredItems = items;
  if (filters.platformFilter) {
    filteredItems = applyPlatformFilter(filteredItems, filters.platformFilter);
  }
  if (filters.variableFilter) {
    filteredItems = applyVariableFilter(filteredItems, filters.variableFilter);
  }
  if (filters.geoFilter) {
    filteredItems = applyGeoFilter(filteredItems, filters.geoFilter);
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
  return state.featureFlags.filters;
};

export const selectors = {
  getFilteredFeatureFlagLogs: getFilteredFeatureFlags,
  getFilters,
};

export default featureFlagSlice.reducer;
