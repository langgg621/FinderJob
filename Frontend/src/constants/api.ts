export const BASE_URL = "http://192.168.1.10:7166/api/v1/"
export const AUTH = {
    REGISTER_COM: "Profile/register-company",
    REGISTER_EMP:"Profile/register-employee",
    LOGIN: "Profile/login"
}
export const COMPANY = {
    RESET_PASSWORD:"Company/reset-password",
    GET:"Company/company",
    DELETE: "Company/delete",
    UPDATE: "Company/update",
    UPLOAD_IMAGE:"Company/uploadImage",
    GETBYID: "Company/get"
}
export const EMPLOYEE ={
    RESET_PASSWORD:"Employee/reset-password",
    GET:"Employee/employee",
    DELETE: "Employee/delete",
    UPDATE: "Employee/update",
    UPLOAD_IMAGE:"Employee/uploadImage"
}
export const APPLY_JOB ={
    APPLY: "ApplyJob/apply",
    DELETE: "ApplyJob/cancelApply",
}
export const FILE_CV = {
    UPLOAD_CV: "FileCV/upload",
    GET_ALL: "FileCV/get-all-by-employeeId",
    DELETE:"FileCV/delete"
}
export const RECRUITMENT = {
    CREATE: "Recruitment/create",
    UPDATE: "Recruitment/update",
    DELETE:"Recruitment/delete",
    GET_ALL:"Recruitment/get-all",
    GET:"Recruitment/get",
    GET_BY_COMPANY:"Recruitment/getbycompany",
    GET_RECRUITMENT_HAS_BEEN_APPLY_BY_EMPLOYEE:"Recruitment/recruitment-has-been-applied-by-employee",
    GET_RECRUITMENT_NOT_APPLY_BY_EMPLOYEE:"Recruitment/recruitment-not-applied-by-employee",
    SEARCH_SALARY:"Recruitment/search/salary",
    SEARCH_SKILL:"Recruitment/search/address",
    SEARCH_ADDRESS:"Recruitment/search/address",
    SEARCH_TITLE:"Recruitment/search/title"
}