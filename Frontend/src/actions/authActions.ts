// file: src/actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, AUTH } from '../constants/api';
import httpClient from '../httpClient';

export const registerCompanyAction = createAsyncThunk(
  'auth/registerCompany',
  async (companyData: {}) => {
    const response = await httpClient.post(AUTH.REGISTER_COM, companyData);
    return response.data;
  }
);

export const registerEmployeeAction = createAsyncThunk(
  'auth/registerEmployee',
  async (employeeData:{}) => {
    const response = await httpClient.post(AUTH.REGISTER_EMP, employeeData);
    return response.data;
  }
);

export const loginActions = createAsyncThunk(
  'auth/loginActions',
  async (payload: {}) => {
      const res = await httpClient.post(AUTH.LOGIN, payload)
      return res.data
  }
)
