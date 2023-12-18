/* eslint-disable prettier/prettier */

import { configureStore } from '@reduxjs/toolkit';
import recruitmentReducer from '../reducers/recruitmentReducer';
import authReducer from '../reducers/authReducer';
import applyJobReducer from '../reducers/applyJobReducer';
import companyReducer from '../reducers/companyReducer';
import employeeReducer from '../reducers/employeeReducer';
import fileCvReducer from '../reducers/fileCvReducer';

const store = configureStore({
    reducer: {
        recruitment: recruitmentReducer,
        auth: authReducer,
        applyJob: applyJobReducer,
        company: companyReducer,
        employee: employeeReducer,
        fileCv: fileCvReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

