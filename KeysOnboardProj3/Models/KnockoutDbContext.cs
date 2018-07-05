using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace KeysOnboardProj3.Models
{
    public class KnockoutDbContext : DbContext
    {
        public System.Data.Entity.DbSet<KeysOnboardProj3.Models.Customer> Customers { get; set; }

        public System.Data.Entity.DbSet<KeysOnboardProj3.Models.Product> Products { get; set; }

        public System.Data.Entity.DbSet<KeysOnboardProj3.Models.Store> Stores { get; set; }
    }
}