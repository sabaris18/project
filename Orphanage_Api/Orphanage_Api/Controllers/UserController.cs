using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccessLayer.Model;
using DataAccessLayer;
using BusinessLayer;

namespace Orphanage_Api.Controllers
{
    public class UserController : ApiController
    {
        private UserBL db = new UserBL();

        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                RespMessage response = new RespMessage();
                response.Message = db.AddUser(user);
                return Ok(response);
            }
        }

        [HttpGet]
        [Route("api/user/login/{email}/{password}")]
        public IHttpActionResult login(string email, string password)
        {
            RespLogin response = new RespLogin();

            User u = db.login(email, password);
            if (u != null)
            {
                response.UserID = u.UserID.ToString();
                response.EmailID = u.EmailID;
                response.Message = "Login successful";
            }
            else
            {
                response.UserID = "0";
                response.EmailID = "";
                response.Message = "Invalid email id or password";
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("api/user/orphanLogin/{email}/{password}")]
        public IHttpActionResult orphanLogin(string email, string password)
        {
            RespLogin response = new RespLogin();

            User u = db.orphanLogin(email, password);
            if (u != null)
            {
                if (u.Flag == 1)
                {
                    response.UserID = u.UserID.ToString();
                    response.EmailID = u.EmailID;
                    response.Message = "Login successful";
                }
                else if (u.Flag == 0)
                {
                    response.UserID = u.UserID.ToString();
                    response.EmailID = u.EmailID;
                    response.Message = "Account not approved";
                }
                else if (u.Flag == 2) 
                {
                    response.UserID = u.UserID.ToString();
                    response.EmailID = u.EmailID;
                    response.Message = "Account request rejected";
                }
            }
            else
            {
                response.UserID = "0";
                response.EmailID = "";
                response.Message = "Invalid email id or password";
            }
            return Ok(response);
        }


        [HttpGet]
        [Route("api/user/getCategory/{type}")]
        public List<Category> getCategory(string type)
        {
            return db.getCategory(type);
        }

        [HttpPost]
        [Route("api/user/donate")]
        public IHttpActionResult donate(Donation d)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                RespMessage response = new RespMessage();
                response.Message = db.donate(d);
                return Ok(response);
            }
        }

        [HttpGet]
        [Route("api/user/manageDonation")]
        public List<ManageDonation> manageDonation()
        {
            return db.manageDonation();
        }

    }
}