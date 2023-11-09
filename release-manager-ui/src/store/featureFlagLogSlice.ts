import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import featureFlagApi from "./featureFlagLogApi";
import { RootState } from ".";
import { FeatureFlagLog } from "../pages/FeatureFlagLogList";

export interface FeatureFlagLogList {
  featureFlagLogs: FeatureFlagLog[];
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
};

const initialState: FeatureFlagLogList = {
  featureFlagLogs: [],
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
  },
};
export const fetchFeatureFlags = createAsyncThunk(
  "featureFlags/fetchFeatureFlags",
  async (_, { dispatch }) => {
    const response = await featureFlagApi.fetchRelease();
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

export const featureFlagLogSlice = createSlice({
  name: "featureFlag",
  initialState,
  reducers: {
    increment: (state) => {
      state.featureFlagLogs = [];
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.featureFlagLogs = [];
    },
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
      state.featureFlagLogs = action.payload;
    });
    builder.addCase(fetchFeatureFlags.rejected, (state) => {
      state.featureFlagLogs = [];
    });
  },
});

export const {
  increment,
  incrementByAmount,
  setFilters,
  setGeos,
  setPlatforms,
  setVariables,
  setUsers,
} = featureFlagLogSlice.actions;

const getFilteredFeatureFlagLogs = (state: RootState) => {
  const items = state.featureFlags.featureFlagLogs;
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

const applyPlatformFilter = (items: FeatureFlagLog[], platform: string) => {
  return items.filter((item) => {
    return item.platform === platform;
  });
};

const applyVariableFilter = (items: FeatureFlagLog[], project: string) => {
  return items.filter((item) => {
    return item.name === project;
  });
};

const applySearch = (items: FeatureFlagLog[], search: string) => {
  const searchValue = search.toLocaleLowerCase();
  return items.filter((item) => {
    return (
      item.platform.toLocaleLowerCase().includes(searchValue) ||
      item.name.toLocaleLowerCase().includes(searchValue) ||
      item.geo.toLocaleLowerCase().includes(searchValue) ||
      item.changedBy.toLocaleLowerCase().includes(searchValue) ||
      item.value.toString().toLocaleLowerCase().includes(searchValue)
    );
  });
};

const applyGeoFilter = (items: FeatureFlagLog[], geo: string) => {
  return items.filter((item) => {
    return geo === "XX" || item.geo === geo || item.geo === "XX";
  });
};

const applyUserFilter = (items: FeatureFlagLog[], user: string) => {
  return items.filter((item) => {
    return item.changedBy === user;
  });
};

const applyFilters = (
  items: FeatureFlagLog[],
  filters: Partial<TableFilters>
) => {
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
  return filteredItems;
};

const getFilters = (state: RootState) => {
  return state.featureFlags.filters;
};

export const selectors = { getFilteredFeatureFlagLogs, getFilters };

export default featureFlagLogSlice.reducer;
