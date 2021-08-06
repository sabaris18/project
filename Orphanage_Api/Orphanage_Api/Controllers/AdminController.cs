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
    public class AdminController : ApiController
    {
        private AdminBL db = new AdminBL();

        [HttpGet]
        [Route("api/admin/login/{username}/{password}")]
        public IHttpActionResult login(string username, string password)
        {
            RespLogin response = new RespLogin();

            Admin a = db.adminLogin(username, password);
            if (a != null)
            {
                response.UserID = a.AdminID.ToString();
                response.EmailID = a.Username;
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
        [Route("api/admin/viewDonation")]
        public List<ViewDonation> viewDonation()
        {
            return db.viewDonation();
        }

        [HttpGet]
        [Route("api/admin/orphanRequest")]
        public List<User> orphanRequest()
        {
            return db.getOrphanRequest();
        }

        [HttpGet]
        [Route("api/admin/updateFlag/{UserID}/{Flag}")]
        public IHttpActionResult updateFlag(string UserID, string Flag)
        {
            RespMessage response = new RespMessage();
            response.Message = db.updateFlag(UserID, Flag);
            return Ok(response);
        }

        [HttpGet]
        [Route("api/admin/getUserList")]
        public List<User> getUserList()
        {
            return db.getUserList();
        }


        [HttpGet]
        [Route("api/admin/manageDonationList")]
        public List<ManageDonation> manageDonationList()
        {
            return db.manageDonationList();
        }

        [HttpPost]
        [Route("api/admin/manageDonation")]
        public IHttpActionResult manageDonation(List<ManageDonation> donation)
        {
            RespMessage response = new RespMessage();
            response.Message = db.manageDonation(donation);
            return Ok(response);
        }

    }
}