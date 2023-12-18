// file: src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { registerCompanyAction, registerEmployeeAction, loginActions } from '../actions/authActions';

interface IAuth {
  loading: boolean,
  res: [],
  message: string,
}

const initialState :IAuth = {
  res: [],
    loading: false,
    message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerCompanyAction.pending, (state) => {
      return {
          ...state,
          loading: true,
        };
  })
  builder.addCase(registerCompanyAction.fulfilled, (state) => {
      return {
          ...state,
          loading: false,
        };
  })
  builder.addCase(registerCompanyAction.rejected, (state) => {
      return {
          ...state,
          loading: true,
        };
  })
  builder.addCase(registerEmployeeAction.pending, (state) => {
    return {
        ...state,
        loading: true,
      };
  })
  builder.addCase(registerEmployeeAction.fulfilled, (state) => {
      return {
          ...state,
          loading: false,
        };
  })
  builder.addCase(registerEmployeeAction.rejected, (state) => {
      return {
          ...state,
          loading: true,
        };
  })
  builder.addCase(loginActions.pending, (state) => {
      return {
          ...state,
          loading: true,
        };
  })
  builder.addCase(loginActions.fulfilled, (state) => {
      return {
          ...state,
          loading: false,
        };
  })
  builder.addCase(loginActions.rejected, (state) => {
      return {
          ...state,
          loading: true,
        };
  })
  },
});

export default authSlice.reducer;
