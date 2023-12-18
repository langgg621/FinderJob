// file: src/reducers/recruitmentReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createRecruitmentAction,
  updateRecruitmentAction,
  deleteRecruitmentAction,
  getAllRecruitmentAction,
  getRecruitmentAction,
  getRecruitmentByCompanyAction,
  getRecruitmentHasBeenAppliedByEmployeeAction,
  getRecruitmentNotAppliedByEmployeeAction,
} from '../actions/recruitmentActions';

interface IRecr {
    loading: boolean,
    res: [],
    message: string,
}

const initialState :IRecr = {
    res: [],
    loading: false,
    message: '',
};

const recruitmentSlice = createSlice({
    name: 'recruitment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRecruitmentAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(createRecruitmentAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
              };
        })
        builder.addCase(createRecruitmentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(updateRecruitmentAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(updateRecruitmentAction.fulfilled, (state) => {
            return {
                ...state,
                loading: false,
              };
        })
        builder.addCase(updateRecruitmentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(deleteRecruitmentAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(deleteRecruitmentAction.fulfilled, (state) => {
          return {
              ...state,
              loading: false,
            };
        })
        builder.addCase(deleteRecruitmentAction.rejected, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getAllRecruitmentAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getAllRecruitmentAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
              };
        })
        builder.addCase(getAllRecruitmentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(getRecruitmentAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getRecruitmentAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
              };
        })
        builder.addCase(getRecruitmentAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(getRecruitmentByCompanyAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getRecruitmentByCompanyAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
              };
        })
        builder.addCase(getRecruitmentByCompanyAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(getRecruitmentHasBeenAppliedByEmployeeAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getRecruitmentHasBeenAppliedByEmployeeAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
              };
        })
        builder.addCase(getRecruitmentHasBeenAppliedByEmployeeAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
        builder.addCase(getRecruitmentNotAppliedByEmployeeAction.pending, (state) => {
          return {
              ...state,
              loading: true,
            };
        })
        builder.addCase(getRecruitmentNotAppliedByEmployeeAction.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                res: action.payload.data
              };
        })
        builder.addCase(getRecruitmentNotAppliedByEmployeeAction.rejected, (state) => {
            return {
                ...state,
                loading: true,
              };
        })
    },
});

export default recruitmentSlice.reducer;
