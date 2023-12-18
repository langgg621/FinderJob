import { createSlice } from '@reduxjs/toolkit';
import {
  uploadCvAction,
  getAllCvByEmployeeIdAction,
  deleteCvAction,
} from '../actions/fileCvActions';

interface IFile {
  loading: boolean,
  res: [],
  message: string,
}

const initialState :IFile = {
  res: [],
    loading: false,
    message: '',
};

const fileCvSlice = createSlice({
  name: 'fileCv',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadCvAction.pending, (state) => {
      return {
          ...state,
          loading: true,
        };
    })
    builder.addCase(getAllCvByEmployeeIdAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
          };
    })
    builder.addCase(uploadCvAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
          };
    })
    builder.addCase(getAllCvByEmployeeIdAction.pending, (state) => {
      return {
          ...state,
          loading: true,
        };
    })
    builder.addCase(uploadCvAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
          };
    })
    builder.addCase(getAllCvByEmployeeIdAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
          };
    })
    builder.addCase(deleteCvAction.pending, (state) => {
      return {
          ...state,
          loading: true,
        };
    })
    builder.addCase(deleteCvAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
          };
    })
    builder.addCase(deleteCvAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
          };
    })
  },
});

export default fileCvSlice.reducer;
