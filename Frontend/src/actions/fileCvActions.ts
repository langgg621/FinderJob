import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, FILE_CV } from '../constants/api';
import httpClient from '../httpClient';

// Action để tải lên CV
export const uploadCvAction = createAsyncThunk(
  'fileCv/uploadCv',
  async (cvData) => {
    const response = await httpClient.post(FILE_CV.UPLOAD_CV, cvData);
    return response.data;
  }
);

// Action để lấy tất cả CV của một nhân viên
export const getAllCvByEmployeeIdAction = createAsyncThunk(
  'fileCv/getAllByEmployeeId',
  async (employeeId) => {
    const response = await httpClient.get(FILE_CV.GET_ALL);
    return response.data;
  }
);

// Action để xóa một CV
export const deleteCvAction = createAsyncThunk(
  'fileCv/deleteCv',
  async (cvId) => {
    const response = await httpClient.delete(`${FILE_CV.DELETE}?cvId=${cvId}`);
    return response.data;
  }
);
