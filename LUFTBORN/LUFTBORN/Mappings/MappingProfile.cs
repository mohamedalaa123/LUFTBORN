using AutoMapper;
using LUFTBORN.Models;
using LUFTBORN.ViewModels;

namespace LUFTBORN.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeViewModel>();

            CreateMap<EmployeeViewModel, Employee>();
        }
    }
}
