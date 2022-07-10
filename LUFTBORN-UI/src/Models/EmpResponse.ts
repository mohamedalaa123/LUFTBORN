import BaseResponse from "../Base/BaseResponse";
import Employee from "./Employee";


export default interface EmpResponse extends BaseResponse {

    employee: Employee;

}