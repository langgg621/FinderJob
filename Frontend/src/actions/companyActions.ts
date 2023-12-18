import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, COMPANY } from '../constants/api';
import httpClient from '../httpClient';
import formdata from '../httpClient/multipartData';

// Action để đặt lại mật khẩu của công ty
export const resetCompanyPasswordAction = createAsyncThunk(
  'company/resetPassword',
  async (resetPasswordData:{}) => {
    const response = await httpClient.put(COMPANY.RESET_PASSWORD, resetPasswordData);
    return response.data;
  }
);

// Action để lấy thông tin của một công ty
export const getCompanyAction = createAsyncThunk(
  'company/get',
  async () => {
    const response = await httpClient.get(COMPANY.GET);
    return response.data;
  }
);

export const getCompanyByIdAction = createAsyncThunk(
  'company/getbyid',
  async(id: number) => {
    const response = await httpClient.get(`${COMPANY.GETBYID}/${id}`);
    return response.data;
  }
  )
// Action để xóa một công ty
export const deleteCompanyAction = createAsyncThunk(
  'company/delete',
  async () => {
    const response = await httpClient.delete(COMPANY.DELETE);
    return response.data;
  }
);

// Action để cập nhật thông tin của công ty
export const updateCompanyAction = createAsyncThunk(
  'company/update',
  async (companyData:{}) => {
    const response = await httpClient.put(COMPANY.UPDATE, companyData);
    return response.data;
  }
);

// Action để tải lên hình ảnh cho công ty
export const uploadCompanyImageAction = createAsyncThunk(
  'company/uploadImage',
  async (imageData:{}) => {
    const response = await httpClient.post(COMPANY.UPLOAD_IMAGE, imageData);
    return response.data;
  }
);
