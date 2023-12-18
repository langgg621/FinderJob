// file: src/reducers/employeeReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  resetEmployeePasswordAction,
  getEmployeeAction,
  deleteEmployeeAction,
  updateEmployeeAction,
  uploadEmployeeImageAction,
} from '../actions/employeeActions';

interface IEMP{
  loading: boolean,
  res:[],
  message: string,
}
const initialState :IEMP = {
  loading: false,
  res:[],
  message: '',
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
    })
    builder.addCase(getEmployeeAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
        };
    })
    builder.addCase(getEmployeeAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(resetEmployeePasswordAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(resetEmployeePasswordAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
        };
    })
    builder.addCase(resetEmployeePasswordAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(deleteEmployeeAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(deleteEmployeeAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
        };
    })
    builder.addCase(deleteEmployeeAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(updateEmployeeAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(updateEmployeeAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
        };
    })
    builder.addCase(updateEmployeeAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(uploadEmployeeImageAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(uploadEmployeeImageAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
        };
    })
    builder.addCase(uploadEmployeeImageAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
  },
});

export default employeeSlice.reducer;
