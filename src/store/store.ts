import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/users.slice";
import curriculumReducer from "../redux/curriculums.slice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    curriculum: curriculumReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
