using DataAccessLayer;
using DataAccessLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class AdminBL
    {
        private OrphanageContext db = new OrphanageContext();
        public Admin adminLogin(string username, string password)
        {
            Admin admin = db.Admins.SingleOrDefault(a => a.Username == username && a.Password == password);
            return admin;
        }

    }
}
