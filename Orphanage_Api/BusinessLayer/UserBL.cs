﻿using DataAccessLayer;
using DataAccessLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class UserBL
    {
        private OrphanageContext db = new OrphanageContext();

        public string AddUser(User user)
        {
            try
            {
                int rowsAffected = 0;

                if (db.Users.Any(u => u.EmailID == user.EmailID))
                {
                    return "Email ID already exists";
                }
                else
                {
                    db.Users.Add(user);
                    rowsAffected = db.SaveChanges();

                    if (rowsAffected == 0)
                        return "Something went wrong";
                    else
                        return "Registration successful";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public User login(string email, string password, string role)
        {
            User user = db.Users.SingleOrDefault(u => u.EmailID == email && u.Password == password && u.Role == role );
            return user;
        }

        public List<Category> getCategory(string type)
        {
            return db.Categories.SqlQuery("select * from Categories where CategoryType = '"+type+"'").ToList();
        }

        public string donate(Donation d)
        {
            try
            {
                int rowsAffected = 0;
                d.DonationDate = DateTime.Now;

                db.Donations.Add(d);
                rowsAffected = db.SaveChanges();

                if (rowsAffected == 0)
                    return "Something went wrong";
                else
                    return "Donation successful";

            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

    }
}
