// file: src/actions/recruitmentActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RECRUITMENT } from '../constants/api';
import httpClient from '../httpClient';


// Action để tạo mới tin tuyển dụng
export const createRecruitmentAction = createAsyncThunk(
  'recruitment/create',
  async (payload:{}) => {
    const response = await httpClient.post(RECRUITMENT.CREATE, payload);
    return response.data;
  }
);
interface UpdateRecruitmentPayload {
  id: number;
  recruitmentData: {}; // Replace with the actual type of recruitmentData
}
// Action để cập nhật tin tuyển dụng
export const updateRecruitmentAction = createAsyncThunk(
  'recruitment/update',
  async ({ id, recruitmentData }: UpdateRecruitmentPayload) => {
    const response = await httpClient.put(`${RECRUITMENT.UPDATE}/${id}`, recruitmentData);
    return response.data;
  }
);

// Action để xóa tin tuyển dụng
export const deleteRecruitmentAction = createAsyncThunk(
  'recruitment/delete',
  async (id: number) => {
    const response = await httpClient.delete(`${RECRUITMENT.DELETE}/${id}`);
    return response.data;
  }
);

// Action để lấy tất cả tin tuyển dụng
export const getAllRecruitmentAction = createAsyncThunk(
  'recruitment/getAll',
  async () => {
    const response = await httpClient.get(RECRUITMENT.GET_ALL);
    return response.data;
  }
);

// Action để lấy một tin tuyển dụng cụ thể
export const getRecruitmentAction = createAsyncThunk(
  'recruitment/get',
  async (recruitmentId:string) => {
    const response = await httpClient.get(`${RECRUITMENT.GET}?id=${recruitmentId}`);
    return response.data;
  }
);

// Action để lấy tất cả tin tuyển dụng của một công ty
export const getRecruitmentByCompanyAction = createAsyncThunk(
  'recruitment/getByCompany',
  async () => {
    const response = await httpClient.get(RECRUITMENT.GET_BY_COMPANY);
    return response.data;
  }
);

// Action để lấy tất cả tin tuyển dụng đã được ứng tuyển bởi một nhân viên
export const getRecruitmentHasBeenAppliedByEmployeeAction = createAsyncThunk(
  'recruitment/getRecruitmentHasBeenAppliedByEmployee',
  async () => {
    const response = await httpClient.get(RECRUITMENT.GET_RECRUITMENT_HAS_BEEN_APPLY_BY_EMPLOYEE);
    return response.data;
  }
);

// Action để lấy tất cả tin tuyển dụng chưa được ứng tuyển bởi một nhân viên
export const getRecruitmentNotAppliedByEmployeeAction = createAsyncThunk(
  'recruitment/getRecruitmentNotAppliedByEmployee',
  async () => {
    const response = await httpClient.get(RECRUITMENT.GET_RECRUITMENT_NOT_APPLY_BY_EMPLOYEE);
    return response.data;
  }
);
export const searchSalaryAction = createAsyncThunk(
  'recruitment/searchbysalary',
  async ({ start, end }: { start: number; end: number }) => {
    const response = await httpClient.get(`${RECRUITMENT.SEARCH_SALARY}/${start}/${end}`);
    return response.data;
  }
);
export const searchSkillAction = createAsyncThunk(
  'recruitment/searchbyskill',
  async (skill: string) => {
    const response = await httpClient.get(`${RECRUITMENT.SEARCH_SKILL}?skill=${skill}`);
    return response.data;
  }
);
export const searchAddressAction = createAsyncThunk(
  'recruitment/searchbyaddress',
  async (add: string) => {
    const response = await httpClient.get(`${RECRUITMENT.SEARCH_ADDRESS}?address=${add}`);
    return response.data;
  }
);
export const searchTitleAction = createAsyncThunk(
  'recruitment/searchbytitle',
  async (title: string) => {
    const response = await httpClient.get(`${RECRUITMENT.SEARCH_TITLE}?title=${title}`);
    return response.data;
  }
);