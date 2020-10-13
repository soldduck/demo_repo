using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DigitalCatalogueNetCore.Models;
using DigitalCatalogueNetCore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System;

namespace DigitalCatalogueNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    { 
        private AuthService _authService;
        protected readonly ILogger<AccountController> _logger;

        public AccountController(AuthService authService, ILogger<AccountController> logger = null)
        {
            _authService = authService;
            if (logger != null)
            {
                _logger = logger;
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<BiblioUser>> Login(LoginUserModel loginModel)
        {
            try
            {
                BiblioUser biblioUser = await _authService.Authentication(loginModel);
                if (!string.IsNullOrEmpty(biblioUser.Token))
                    return Ok(biblioUser);
                return Unauthorized(new BiblioUser() { UserError = "Пользователя не существует!"});
            }
            catch (Exception e)
            {
                _logger.LogError("Error {0} while auth! Data: {1}, {2}", e.Message, loginModel.PassId, loginModel.Surname);
                return Unauthorized(new BiblioUser() { UserError = "Пользователя не существует!" });
            }
        }


    }
}
