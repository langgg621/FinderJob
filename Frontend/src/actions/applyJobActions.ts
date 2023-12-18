import { createAsyncThunk } from "@reduxjs/toolkit";
import { APPLY_JOB, BASE_URL } from "../constants/api";
import httpClient from "../httpClient";

// Action để tạo mới tin tuyển dụng
export const createApplyAction = createAsyncThunk(
'apply/create',
async (id: number) => {
    const response = await httpClient.post(`${APPLY_JOB.APPLY}/${id}`);
    return response.data;
  }
);
export const deleteApplyAction = createAsyncThunk(
  'apply/delete',
  async (applyId: number) => {
  const response = await httpClient.delete(`${APPLY_JOB.DELETE}?id=${applyId}`);
  return response.data;
  }
);