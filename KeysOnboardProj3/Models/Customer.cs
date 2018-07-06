using System.ComponentModel.DataAnnotations;


namespace KeysOnboardProj3.Models
{
    public class Customer
    {
        public virtual int Id { get; set; }
        [Display(Name = "Customer Name")]
        [Required(ErrorMessage = "Customer name is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' ']+$", ErrorMessage = "Special charecters are not allowed")]
        public string Name { get; set; }
        public string Address { get; set; }
    }
}