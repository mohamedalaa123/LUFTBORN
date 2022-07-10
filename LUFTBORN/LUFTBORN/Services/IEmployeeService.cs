using LUFTBORN.Base;
using LUFTBORN.Requests;
using LUFTBORN.Responses;
using LUFTBORN.ViewModels;

namespace LUFTBORN.Services
{
    public interface IEmployeeService
    {
        Task<EmployeesResponse> AllEmployees();
        Task<BaseResponse> CreateEmployee(NewEmployeeRequest request);

        Task<BaseResponse> DeleteEmployee(EmployeeRequest request);
        Task<EmpResponse> GetEmployeeById(EmployeeRequest request);

        Task<BaseResponse> UpdateEmployee(NewEmployeeRequest request);



    }
}
