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
        [Route("api/user/login/{email}/{password}/{role}")]
        public IHttpActionResult login(string email, string password, string role)
        {
            RespLogin response = new RespLogin();

            User u = db.login(email, password, role);
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

        // GET api/User
        //public IQueryable<User> GetUsers()
        //{
        //    return db.Users;
        //}

        //// GET api/User/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult GetUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(user);
        //}

        // PUT api/User/5
        //public IHttpActionResult PutUser(int id, User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != user.UserID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(user).State = System.Data.EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST api/User
        //[ResponseType(typeof(User))]
        //public IHttpActionResult PostUser(User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Users.Add(user);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = user.UserID }, user);
        //}

        //// DELETE api/User/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult DeleteUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Users.Remove(user);
        //    db.SaveChanges();

        //    return Ok(user);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        //private bool UserExists(int id)
        //{
        //    return db.Users.Count(e => e.UserID == id) > 0;
        //}
    }
}