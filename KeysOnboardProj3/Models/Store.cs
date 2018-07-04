using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KeysOnboardProj3.Models
{
    public class Store
    {
        public virtual int Id { get; set; }
        [Display(Name = "Store Name")]
        [Required(ErrorMessage = "Store name is required")]
        [RegularExpression(@"^[a-zA-Z0-9'' '] + $", ErrorMessage = "Special charecters not allowed")]
        public virtual string Name { get; set; }
        [Display(Name = "Store Address")]
        public virtual String Address { get; set; }
    }
}