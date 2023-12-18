// file: src/reducers/applyReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createApplyAction,
  deleteApplyAction,
} from '../actions/applyJobActions';

interface IApply {
  loading: boolean,
  res: [],
  message: string,
}

const initialState :IApply = {
  res: [],
    loading: false,
    message: '',
};

const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createApplyAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApplyAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createApplyAction.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(deleteApplyAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteApplyAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteApplyAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addDefaultCase((state) => state);
  },
});

export default applySlice.reducer;
