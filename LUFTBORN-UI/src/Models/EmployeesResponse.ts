import BaseResponse from "../Base/BaseResponse";
import Employee from "./Employee";

export default interface EmployeesResponse extends BaseResponse {

    employees: Array<Employee>

}