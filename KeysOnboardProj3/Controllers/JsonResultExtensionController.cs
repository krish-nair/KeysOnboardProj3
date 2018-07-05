using KeysOnboardProj3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KeysOnboardProj3.Controllers
{
    internal class JsonResultEXtension
    {
        private ProductSold productSold;
        private string v;

        public JsonResultEXtension(ProductSold productSold, string v)
        {
            this.productSold = productSold;
            this.v = v;
        }
    }
}