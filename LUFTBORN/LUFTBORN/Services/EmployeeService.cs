using AutoMapper;
using LUFTBORN.Base;
using LUFTBORN.Enums;
using LUFTBORN.Models;
using LUFTBORN.Repository;
using LUFTBORN.Requests;
using LUFTBORN.Responses;
using LUFTBORN.ViewModels;

namespace LUFTBORN.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IRepositoryBase<Employee> EmployeeRepository;
        private readonly ILogger<EmployeeService> Logger;
        private readonly IMapper _Mapper;


        public EmployeeService(
            IRepositoryBase<Employee> employeeRepository,
            ILogger<EmployeeService> logger,
               IMapper _mapper
            )
        {
            EmployeeRepository = employeeRepository;
            Logger = logger;
            _Mapper = _mapper;
        }

        public async Task<EmployeesResponse> AllEmployees()
        {
            EmployeesResponse employeeResponse = new EmployeesResponse();
            List<EmployeeViewModel> EmployeesVM = new List<EmployeeViewModel>();
            try
            {
                List<Employee> Employees = EmployeeRepository.FindAll().ToList();
                foreach (var item in Employees)
                {
                    EmployeeViewModel model = new EmployeeViewModel();
                    model = _Mapper.Map<EmployeeViewModel>(item);
                    EmployeesVM.Add(model);
                }

                employeeResponse.Employees = EmployeesVM;
                employeeResponse.StatusMessage = BusinessStatusCode.successfull.ToString();
                employeeResponse.StatusCode = (int)BusinessStatusCode.successfull;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "AllEmployees");
                employeeResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                employeeResponse.StatusCode = (int)BusinessStatusCode.Failed;
            }


            return await Task.FromResult(employeeResponse);
        }

        public async Task<BaseResponse> CreateEmployee(NewEmployeeRequest request)
        {
            BaseResponse _BaseResponse = new BaseResponse();

            try
            {
                if (request == null)
                {
                    _BaseResponse.StatusMessage = BusinessStatusCode.Request_Is_Invalid.ToString();
                    _BaseResponse.StatusCode = (int)BusinessStatusCode.Request_Is_Invalid;
                }

                Employee _Employee = _Mapper.Map<Employee>(request);
                _Employee.AddedDate = DateTime.Now;

                EmployeeRepository.Create(_Employee);
                EmployeeRepository.save();

                _BaseResponse.StatusMessage = BusinessStatusCode.successfull.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.successfull;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "CreateEmployee");
                _BaseResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.Failed;
            }

            return await Task.FromResult(_BaseResponse);
        }

        public async Task<BaseResponse> DeleteEmployee(EmployeeRequest request)
        {
            BaseResponse _BaseResponse = new BaseResponse();

            try
            {
                Employee? _Employee = EmployeeRepository.FindByCondition(a => a.Id == request.Id).FirstOrDefault();
                if (_Employee == null)
                {
                    _BaseResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                    _BaseResponse.StatusCode = (int)BusinessStatusCode.Failed;
                    return _BaseResponse;
                }

                _Employee.IsDeleted = true;
                EmployeeRepository.Update(_Employee);
                EmployeeRepository.save();
                _BaseResponse.StatusMessage = BusinessStatusCode.successfull.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.successfull;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "DeleteEmployee");
                _BaseResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.Failed;
            }

            return await Task.FromResult(_BaseResponse);
        }

        public async Task<EmpResponse> GetEmployeeById(EmployeeRequest request)
        {
            EmpResponse _EmployeeResponse = new EmpResponse();
            try
            {
                Employee? _Employee = EmployeeRepository.FindByCondition(a => a.Id == request.Id).FirstOrDefault();
                if (_Employee == null)
                {
                    _EmployeeResponse.StatusMessage = BusinessStatusCode.Request_Is_Invalid.ToString();
                    _EmployeeResponse.StatusCode = (int)BusinessStatusCode.Request_Is_Invalid;
                    return await Task.FromResult(_EmployeeResponse);
                }

                var _Emddployee = _Mapper.Map<EmployeeViewModel>(_Employee);

                _EmployeeResponse.Employee = _Emddployee;
                _EmployeeResponse.StatusMessage = BusinessStatusCode.successfull.ToString();
                _EmployeeResponse.StatusCode = (int)BusinessStatusCode.successfull;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "DeleteEmployee");
                _EmployeeResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                _EmployeeResponse.StatusCode = (int)BusinessStatusCode.Failed;
            }

            return _EmployeeResponse;
        }

        public async Task<BaseResponse> UpdateEmployee(NewEmployeeRequest request)
        {
            BaseResponse _BaseResponse = new BaseResponse();

            try
            {
                Employee? _Employee = EmployeeRepository.FindByCondition(a => a.Id == request.Id).FirstOrDefault();
                if (_Employee == null)
                {
                    _BaseResponse.StatusMessage = BusinessStatusCode.Request_Is_Invalid.ToString();
                    _BaseResponse.StatusCode = (int)BusinessStatusCode.Request_Is_Invalid;
                    return _BaseResponse;
                }

                _Employee = _Mapper.Map<Employee>(request);


                EmployeeRepository.Update(_Employee);
                EmployeeRepository.save();

                _BaseResponse.StatusMessage = BusinessStatusCode.successfull.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.successfull;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "UpdateEmployee");
                _BaseResponse.StatusMessage = BusinessStatusCode.Failed.ToString();
                _BaseResponse.StatusCode = (int)BusinessStatusCode.Failed;
            }
            return await Task.FromResult(_BaseResponse);
        }
    }
}
