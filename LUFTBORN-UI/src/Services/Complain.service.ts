import http from "../http-common";
import Employee from "../Models/Employee";
import EmployeeRequest from "../Models/EmployeeRequest";
import EmployeeResponse from "../Models/EmployeesResponse";
import EmpResponse from "../Models/EmpResponse";

class ComplainDataService {
    GetStations() {
        return http.post<EmployeeResponse>("/Employee/GetAll");
    }

    GetEmployeeById(Request: EmployeeRequest) {
        return http.post<EmpResponse>(`/Employee/GetById`, Request);
    }

    AddEmployee(request: Employee) {
        return http.post<EmpResponse>(`/Employee/CreateEmployee`, request);
    }

    UpdateEmployee(request: Employee) {
        return http.post<EmpResponse>(`/Employee/UpdateEmployee`, request);
    }


    DeleteEmployeeById(Request: EmployeeRequest) {
        return http.post<EmpResponse>(`/Employee/DeleteEmployee`, Request);
    }




}

export default new ComplainDataService();