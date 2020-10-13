using System;
using DigitalCatalogueNetCore.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

namespace DigitalCatalogueNetCore.Services
{
    public class AuthService
    {

        private static HttpClient _client = new HttpClient();
        private static string _indexURL = Startup.Configuration["dbapi_host"];
        private static string securityKey = Startup.Configuration["securiry_key"];

        public async Task<BiblioUser> Authentication(LoginUserModel loginModel)
        {
            BiblioUser biblioUser = null;
            HttpResponseMessage response = await _client.PostAsJsonAsync(_indexURL + "/api/User/", loginModel);
            if (response.IsSuccessStatusCode)
            {
                biblioUser = await response.Content.ReadAsAsync<BiblioUser>();
                biblioUser.Token = GetToken(biblioUser.Id, biblioUser.UserStatus);
            }
            return biblioUser;
        }

        private string GetToken(string id, string status)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
                {
                    new Claim("UserId", id),
                    new Claim("UserStatus", status)
                };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, "user");

            var token = new JwtSecurityToken(
                    issuer: "WebAPIServer",
                    audience: "WebAPIClient",
                    expires: DateTime.Now.AddMinutes(15),
                    signingCredentials: signingCredentials,
                    claims: claimsIdentity.Claims
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
