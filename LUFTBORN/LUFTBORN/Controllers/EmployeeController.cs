using LUFTBORN.Base;
using LUFTBORN.Requests;
using LUFTBORN.Responses;
using LUFTBORN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LUFTBORN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService EmployeeService;
        public EmployeeController(IEmployeeService _EmployeeService)
        {
            EmployeeService = _EmployeeService;
        }

        [HttpPost]
        [Route("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            EmployeesResponse Result = await EmployeeService.AllEmployees();
            return Ok(Result);
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<ActionResult> GetById(EmployeeRequest request)
        {
            EmpResponse Result = await EmployeeService.GetEmployeeById(request);
            return Ok(Result);
        }

        [HttpPost]
        [Route("CreateEmployee")]
        public async Task<ActionResult> CreateEmployee(NewEmployeeRequest request)
        {
            BaseResponse Result = await EmployeeService.CreateEmployee(request);
            return Ok(Result);
        }

        [HttpPost]
        [Route("UpdateEmployee")]
        public async Task<ActionResult> UpdateEmployee(NewEmployeeRequest request)
        {
            BaseResponse Result = await EmployeeService.UpdateEmployee(request);
            return Ok(Result);
        }


        [HttpPost]
        [Route("DeleteEmployee")]
        public async Task<ActionResult> DeleteEmployee(EmployeeRequest request)
        {
            BaseResponse Result = await EmployeeService.DeleteEmployee(request);
            return Ok(Result);
        }
    }
}


