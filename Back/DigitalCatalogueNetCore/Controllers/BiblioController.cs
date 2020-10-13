using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalCatalogueNetCore.Models;
using DigitalCatalogueNetCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalCatalogueNetCore.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BiblioController : ControllerBase
    {
        private LibraryService _libraryService;

        public BiblioController(LibraryService libraryService)
        {
            _libraryService = libraryService;
        }

        [HttpGet]
        [Route("ClientBooks/{bookStatus}")]
        public async Task<ActionResult<List<BookInfo>>> GetClientBooks(string bookStatus)
        {
            string userId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;

            var result = new List<BookInfo>();
            result = await _libraryService.GetClientBooks(userId, bookStatus);
            return Ok(result);
        }

        [HttpGet]
        [Route("WebDictionary")]
        [AllowAnonymous]
        public ActionResult<Dictionary<string, string>> GetWebDictionary()
        {
            return Ok(_libraryService.GetWebDictionary());
        }

        [HttpPost]
        [Route("Preorder")]
        public async Task<ActionResult<ResponseModel>> PreOrder(OrderModel order)
        {
            var orderStatus = new ResponseModel();
            string userId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            string userStatus = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserStatus")?.Value;
            order.UserId = userId;
            if (userStatus == "2")
                orderStatus = await _libraryService.PreOrder(order);
            else
                orderStatus = new ResponseModel() { Status = "0", ErrMessage = "У Вас имеется задолженность." };

            return Ok(orderStatus);
        }

        [HttpPost]
        [Route("RemovePreorder")]
        public async Task<ActionResult<ResponseModel>> RemovePreOrder(OrderModel order)
        {
            order.UserId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            var orderStatus = new ResponseModel();
            orderStatus = await _libraryService.RemovePreOrder(order);

            return Ok(orderStatus);
        }

        [HttpPost]
        [Route("Order")]
        public async Task<ActionResult<ResponseModel>> Order(OrderModel order)
        {
            var orderStatus = new ResponseModel();
            string userId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            string userStatus = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserStatus")?.Value;
            order.UserId = userId;
            if (userStatus == "2")
                orderStatus = await _libraryService.Order(order);
            else
                orderStatus = new ResponseModel() { Status = "0", ErrMessage = "У Вас имеется задолженность." };
            return Ok(orderStatus);
        }

        

        [HttpPost]
        [AllowAnonymous]
        [Route("Search")]
        public async Task<ActionResult<Dictionary<string, BookInfoReg>>> Search(SearchRequest searchRequest)
        {
            var searchedRFIDs = new Dictionary<string, List<BookInfoReg>>();
            string userId = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            searchedRFIDs = await _libraryService.Search(searchRequest, userId);
            return Ok(searchedRFIDs);
        }
    }
}