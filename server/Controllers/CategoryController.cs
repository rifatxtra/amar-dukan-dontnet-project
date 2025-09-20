using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantOrderManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;
    public CategoryController(AppDbContext context) => _context = context;

    // GET: /api/Category
    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _context.Categories.ToListAsync();
        return Ok(categories);
    }

    // POST: /api/Category
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryModel category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
            return BadRequest(new { message = "Category name is required" });

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return Ok(category);
    }

    // PUT: /api/Category/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> EditCategory(int id, [FromBody] CategoryModel category)
    {
        var existing = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (existing == null)
            return NotFound(new { message = "Category not found" });

        if (string.IsNullOrWhiteSpace(category.Name))
            return BadRequest(new { message = "Category name is required" });

        existing.Name = category.Name;
        _context.Categories.Update(existing);
        await _context.SaveChangesAsync();

        return Ok(existing);
    }

    // DELETE: /api/Category/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var existing = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (existing == null)
            return NotFound(new { message = "Category not found" });

        _context.Categories.Remove(existing);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Category deleted successfully" });
    }
}
