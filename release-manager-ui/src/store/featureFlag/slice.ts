import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import api from "./api";
import { RootState } from "../index";
import { FeatureFlag, FeatureFlagState, TableFilters } from "./models";

export const fetchFeatureFlags = createAsyncThunk<FeatureFlag[]>(
  "featureFlags/fetchFeatureFlags",
  async (_, { dispatch }): Promise<FeatureFlag[]> => {
    const response = await api.fetchFeatureFlag();
    const responseWithFixedDates = response.data
      .map((value) => {
        value.changedAt = new Date(value.changedAt);
        value.changedAtString =
          value.changedAt.toLocaleDateString() +
          ", " +
          value.changedAt.toLocaleTimeString();
        return value;
      })
      .sort(
        (a: FeatureFlag, b: FeatureFlag) =>
          b.changedAt.getTime() - a.changedAt.getTime(),
      );
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
  },
);

const initialState: FeatureFlagState = {
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

export const slice: Slice = createSlice({
  name: "featureFlag",
  initialState,
  reducers: {
    setFilters: (
      state: FeatureFlagState,
      action: PayloadAction<TableFilters>,
    ) => {
      state.filters = action.payload;
    },
    setPlatforms: (
      state: FeatureFlagState,
      action: PayloadAction<string[]>,
    ) => {
      state.platformList = action.payload;
    },
    setVariables: (
      state: FeatureFlagState,
      action: PayloadAction<string[]>,
    ) => {
      state.variableList = action.payload;
    },
    setGeos: (state: FeatureFlagState, action: PayloadAction<string[]>) => {
      state.geoList = action.payload;
    },
    setUsers: (state: FeatureFlagState, action: PayloadAction<string[]>) => {
      state.userList = action.payload;
    },
    clearFilters: (state: FeatureFlagState) => {
      state.filters = {
        search: "",
        userFilter: "",
        variableFilter: "",
        platformFilter: "",
        geoFilter: "",
        fromDate: undefined,
        toDate: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchFeatureFlags.fulfilled,
      (state: FeatureFlagState, action: PayloadAction<FeatureFlag[]>) => {
        state.featureFlags = action.payload;
      },
    );
    builder.addCase(fetchFeatureFlags.rejected, (state: FeatureFlagState) => {
      state.featureFlags = [];
    });
  },
});

export const setFilters = createAction<TableFilters>("featureFlag/setFilters");
export const setPlatforms = createAction<string[]>("featureFlag/setPlatforms");
export const setVariables = createAction<string[]>("featureFlag/setVariables");
export const setGeos = createAction<string[]>("featureFlag/setGeos");
export const setUsers = createAction<string[]>("featureFlag/setUsers");
export const clearFilters = createAction("featureFlag/clearFilters");

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
    }, {}) as Partial<TableFilters>;

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
      item.changedAt.getUTCDate(),
    );
    return changeDate >= fromDate;
  });
};

const applyToDateFilter = (items: FeatureFlag[], toDate: Date) => {
  return items.filter((item) => {
    const changeDate = new Date(
      item.changedAt.getUTCFullYear(),
      item.changedAt.getUTCMonth(),
      item.changedAt.getUTCDate(),
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

export default slice.reducer;
