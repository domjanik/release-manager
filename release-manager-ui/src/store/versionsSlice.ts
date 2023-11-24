import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import versionApi from "./versionsApi";
import { Version } from "../components/Versions";

export const fetchVersions = createAsyncThunk(
  "versions/fetchVersions",
  async (_, { dispatch }) => {
    const response = await versionApi.fetchVersions();
    const responseWithFixedDates = response.data.map((value) => {
      value.createdAt = new Date(value.createdAt);
      value.createdAtString =
        value.createdAt.toLocaleDateString() +
        ", " +
        value.createdAt.toLocaleTimeString();
      return value;
    });
    return responseWithFixedDates;
  }
);

export interface VersionList {
  versions: Version[];
}

const initialState: VersionList = {
  versions: [],
};

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVersions.fulfilled, (state, action) => {
      state.versions = action.payload;
    });
    builder.addCase(fetchVersions.rejected, (state) => {
      state.versions = [];
    });
  },
});

export default versionSlice.reducer;
