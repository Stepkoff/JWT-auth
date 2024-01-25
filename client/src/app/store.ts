import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userSlice from "@/slices/UserSlice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector