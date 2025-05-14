import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  user: User | null;
  reportSetting: ReportSetting | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
}

interface ReportSetting {
  userId: string;
  frequency?: string;
  isEnabled: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  expiresAt: null,
  user: null,
  reportSetting: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.user = action.payload.user;
      state.reportSetting = action.payload.reportSetting;
    },
    updateCredentials: (state, action) => {
      const { token, expiresAt, user, reportSetting } = action.payload;

      if (token !== undefined) state.accessToken = token;
      if (expiresAt !== undefined) state.expiresAt = expiresAt;
      if (user !== undefined) state.user = { ...state.user, ...user };
      if (reportSetting !== undefined)
        state.reportSetting = { ...state.reportSetting, ...reportSetting };
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.user = null;
      state.reportSetting = null;
    },
  },
});

export const { setCredentials, updateCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
