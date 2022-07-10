namespace LUFTBORN.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }
        public DateTime AddedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
