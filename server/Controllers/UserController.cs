using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantOrderManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    public UserController(AppDbContext context) => _context = context;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserModel user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> deleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
