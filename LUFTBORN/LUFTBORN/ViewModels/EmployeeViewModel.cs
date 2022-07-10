using System.ComponentModel.DataAnnotations;

namespace LUFTBORN.ViewModels
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }

        [Required]
        public int Age { get; set; }
        public bool IsDeleted { get; set; }

    }
}
