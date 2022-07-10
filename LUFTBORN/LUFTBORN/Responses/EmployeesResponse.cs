using LUFTBORN.Base;
using LUFTBORN.ViewModels;

namespace LUFTBORN.Responses
{
    public class EmployeesResponse : BaseResponse
    {
        public EmployeesResponse()
        {
            Employees = new List<EmployeeViewModel>();
        }
        public IEnumerable<EmployeeViewModel> Employees { get; set; }
    }
}
