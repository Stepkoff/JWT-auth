import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/models/IUser.ts";
import axios from "axios";
import {AuthResponse} from "@/models/response/AuthResponse.ts";
import {API_URL} from "@/http";
import AuthService from "@/services/AuthService.ts";

export const checkAuth = createAsyncThunk('checkAuth', async () => {
  const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
  console.log(response)
  console.log('checkAuthResponse', response)
  localStorage.setItem('token', response.data.accessToken);
  return response.data
});

export const login = createAsyncThunk('login', async ({email, password}: {email: string, password: string}) => {
  const response = await AuthService.login(email, password);
  localStorage.setItem('token', response.data.accessToken);
  console.log('login response', response)
  return response.data
})

export const logout = createAsyncThunk('logout', async() => {
  await AuthService.logout();
  localStorage.removeItem('token');
  return;
})

export const register = createAsyncThunk('register', async ({email, password}: {email: string, password: string}) => {
  const response = await AuthService.registration(email, password);
  localStorage.setItem('token', response.data.accessToken);
  return response.data
})

interface UserSliceType {
  user: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: UserSliceType = {
  user: null,
  isAuth: false,
  isLoading: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducerLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload.user) {
          state.user = action.payload.user;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })

  }
})

export const {setUserReducerLoading} = userSlice.actions
export default userSlice.reducer