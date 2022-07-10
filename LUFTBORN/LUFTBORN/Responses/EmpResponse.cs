using LUFTBORN.Base;
using LUFTBORN.ViewModels;

namespace LUFTBORN.Responses
{
    public class EmpResponse : BaseResponse
    {
        public EmpResponse()
        {
            Employee = new EmployeeViewModel();
        }
        public EmployeeViewModel Employee { get; set; }
    }
}
