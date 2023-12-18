// file: src/reducers/companyReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
  resetCompanyPasswordAction,
  getCompanyAction,
  deleteCompanyAction,
  updateCompanyAction,
  uploadCompanyImageAction,
  getCompanyByIdAction
} from '../actions/companyActions';

interface ICOM{
  loading: boolean,
  res:[],
  message: string,
}
const initialState: ICOM = {
  res: [],
  loading: false,
  message: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyByIdAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
    })
    builder.addCase(getCompanyByIdAction.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            res: action.payload.data
        };
    })
    builder.addCase(getCompanyByIdAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(getCompanyAction.pending, (state) => {
        return {
            ...state,
            loading: true,
        };
      })
      builder.addCase(getCompanyAction.fulfilled, (state, action) => {
          return {
              ...state,
              loading: false,
              res: action.payload.data
          };
      })
      builder.addCase(getCompanyAction.rejected, (state) => {
          return {
              ...state,
              loading: true,
          };
      })
    builder.addCase(resetCompanyPasswordAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(resetCompanyPasswordAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
        };
    })
    builder.addCase(resetCompanyPasswordAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(deleteCompanyAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(deleteCompanyAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
        };
    })
    builder.addCase(deleteCompanyAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(updateCompanyAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(updateCompanyAction.fulfilled, (state) => {
        return {
            ...state,
            loading: false,
        };
    })
    builder.addCase(updateCompanyAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
    builder.addCase(uploadCompanyImageAction.pending, (state) => {
      return {
          ...state,
          loading: true,
      };
      })
    builder.addCase(uploadCompanyImageAction.fulfilled, (state ) => {
        return {
            ...state,
            loading: false,
        };
    })
    builder.addCase(uploadCompanyImageAction.rejected, (state) => {
        return {
            ...state,
            loading: true,
        };
    })
  }
});

export default companySlice.reducer;
