import { configureStore } from "@reduxjs/toolkit";
import releaseSliceReducer from "./releaseSlice";
import featureFlagReducer from "./featureFlagSlice";
import versionSliceReducer from "./versionsSlice";

export const store = configureStore({
  reducer: {
    version: versionSliceReducer,
    release: releaseSliceReducer,
    featureFlags: featureFlagReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
