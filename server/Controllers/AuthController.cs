using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestaurantOrderManagement.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RestaurantAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
                return BadRequest(new { message = "Email and Password are required" });

            // Check user in DB
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });

            // Only admin allowed
            if (user.Role != "admin")
                return Forbid("Not authorized for admin access");

            // Generate JWT token
            var token = GenerateJwtToken(user);

            //set cookie for browser session
            Response.Cookies.Append("admin_logged_in", "true", new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // set true if using HTTPS
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(2)
            });

            Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // set true if using HTTPS
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddHours(2)
            });
            return Ok(new
            {
                message = "Login successful",
                username = user.Name,
                role = user.Role,
                token // return JWT
            });
        }

        // GET: api/auth/check
        //[HttpGet("check")]
        // public IActionResult CheckLogin()
        // {
        //     // Get the Authorization header
        //     var authHeader = Request.Headers["Authorization"];
        //     var client_token = authHeader.ToString().Replace("Bearer ", "");
        //     var isLoggedIn = Request.Cookies["admin_logged_in"];
        //     var token = Request.Cookies["token"];
        //     if (isLoggedIn == "true")
        //         if (client_token == token)
        //             return Ok(new { loggedIn = true });
        //         else return Unauthorized(new { loggedIn = false, message = "Token mismatch" });

        //     return Unauthorized(new { loggedIn = false,  message = "Not logged in" });
        // }

        [HttpGet("check")]
        public IActionResult CheckLogin()
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
                return Unauthorized(new { loggedIn = false, message = "No token" });

            var token = authHeader.Replace("Bearer ", "");
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero // no tolerance for expiration
                }, out SecurityToken validatedToken);

                return Ok(new { loggedIn = true });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { loggedIn = false, message = "Invalid or expired token" });
            }
        }


        // POST: api/auth/logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("admin_logged_in");
            return Ok(new { message = "Logged out successfully" });
        }

        // Helper: generate JWT token
        private string GenerateJwtToken(UserModel user)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpireMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // Strongly-typed login model
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
