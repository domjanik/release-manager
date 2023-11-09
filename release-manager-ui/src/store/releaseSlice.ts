import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import releaseApi from "./releaseApi";
import { Release } from "../pages/ReleaseList";
import { RootState } from ".";
import { TableFilters } from "../components/ReleaseTableControls";

export interface ReleaseList {
  releases: Release[];
  filters: TableFilters;
  platformList: string[];
  projectList: string[];
  geoList: string[];
  userList: string[];
}

const initialState: ReleaseList = {
  releases: [],
  platformList: [],
  projectList: [],
  geoList: [],
  userList: [],
  filters: {
    search: "",
    userFilter: "",
    projectFilter: "",
    platformFilter: "",
    geoFilter: "",
  },
};
export const fetchReleases = createAsyncThunk(
  "release/fetchReleases",
  async (_, { dispatch }) => {
    const response = await releaseApi.fetchRelease();
    const responseWithFixedDates = response.data.map((value) => {
      value.publishedAt = new Date(value.publishedAt);
      value.publishedAtString =
        value.publishedAt.toLocaleDateString() +
        ", " +
        value.publishedAt.toLocaleTimeString();
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
      if (!projects.includes(value.projectName)) {
        projects.push(value.projectName);
      }
      if (!geos.includes(value.geo)) {
        geos.push(value.geo);
      }
      if (!users.includes(value.publishedBy)) {
        users.push(value.publishedBy);
      }
    });
    dispatch(setPlatforms(platforms));
    dispatch(setProjects(projects));
    dispatch(setGeos(geos));
    dispatch(setUsers(users));

    return responseWithFixedDates;
  }
);

export const releaseSlice = createSlice({
  name: "release",
  initialState,
  reducers: {
    increment: (state) => {
      state.releases = [];
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.releases = [];
    },
    setFilters: (state, action: PayloadAction<TableFilters>) => {
      state.filters = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<string[]>) => {
      state.platformList = action.payload;
    },
    setProjects: (state, action: PayloadAction<string[]>) => {
      state.projectList = action.payload;
    },
    setGeos: (state, action: PayloadAction<string[]>) => {
      state.geoList = action.payload;
    },
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.userList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReleases.fulfilled, (state, action) => {
      state.releases = action.payload;
    });
    builder.addCase(fetchReleases.rejected, (state) => {
      state.releases = [];
    });
  },
});

export const {
  increment,
  incrementByAmount,
  setFilters,
  setGeos,
  setPlatforms,
  setProjects,
  setUsers,
} = releaseSlice.actions;

const getFilteredReleases = (state: RootState) => {
  const items = state.release.releases;
  const allFilters = state.release.filters;
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

const applyPlatformFilter = (items: Release[], platform: string) => {
  return items.filter((item) => {
    return item.platform === platform;
  });
};

const applyProjectFilter = (items: Release[], project: string) => {
  return items.filter((item) => {
    return item.projectName === project;
  });
};

const applySearch = (items: Release[], search: string) => {
  const searchValue = search.toLocaleLowerCase();
  return items.filter((item) => {
    return (
      item.platform.toLocaleLowerCase().includes(searchValue) ||
      item.projectName.toLocaleLowerCase().includes(searchValue) ||
      item.geo.toLocaleLowerCase().includes(searchValue) ||
      item.publishedBy.toLocaleLowerCase().includes(searchValue) ||
      item.version.toLocaleLowerCase().includes(searchValue) ||
      item.description?.toLocaleLowerCase().includes(searchValue)
    );
  });
};

const applyGeoFilter = (items: Release[], geo: string) => {
  return items.filter((item) => {
    return geo === "XX" || item.geo === geo || item.geo === "XX";
  });
};

const applyUserFilter = (items: Release[], user: string) => {
  return items.filter((item) => {
    return item.publishedBy === user;
  });
};

const applyFilters = (items: Release[], filters: Partial<TableFilters>) => {
  let filteredItems = items;
  if (filters.platformFilter) {
    filteredItems = applyPlatformFilter(filteredItems, filters.platformFilter);
  }
  if (filters.projectFilter) {
    filteredItems = applyProjectFilter(filteredItems, filters.projectFilter);
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
  return state.release.filters;
};

export const selectors = { getFilteredReleases, getFilters };

export default releaseSlice.reducer;
