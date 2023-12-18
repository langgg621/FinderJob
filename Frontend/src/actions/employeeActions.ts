import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, EMPLOYEE } from '../constants/api';
import httpClient from '../httpClient';
import formdata from '../httpClient/multipartData';

// Action để đặt lại mật khẩu của nhân viên
export const resetEmployeePasswordAction = createAsyncThunk(
  'employee/resetPassword',
  async (resetPasswordData:{}) => {
    const response = await httpClient.post(EMPLOYEE.RESET_PASSWORD, resetPasswordData);
    return response.data;
  }
);

// Action để lấy thông tin của một nhân viên
export const getEmployeeAction = createAsyncThunk(
  'employee/get',
  async () => {
    const response = await httpClient.get(EMPLOYEE.GET);
    return response.data;
  }
);

// Action để xóa một nhân viên
export const deleteEmployeeAction = createAsyncThunk(
  'employee/delete',
  async () => {
    const response = await httpClient.delete(EMPLOYEE.DELETE);
    return response.data;
  }
);

// Action để cập nhật thông tin của nhân viên
export const updateEmployeeAction = createAsyncThunk(
  'employee/update',
  async (employeeData:{}) => {
    const response = await httpClient.put(EMPLOYEE.UPDATE, employeeData);
    return response.data;
  }
);

// Action để tải lên hình ảnh cho nhân viên
export const uploadEmployeeImageAction = createAsyncThunk(
  'employee/uploadImage',
  async (imageData:{}) => {
    const response = await httpClient.post(EMPLOYEE.UPLOAD_IMAGE, imageData);
    return response.data;
  }
);
