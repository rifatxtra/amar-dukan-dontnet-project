using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantOrderManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly AppDbContext _context;
    public MenuController(AppDbContext context) => _context = context;

    // GET: /api/Menu
    [HttpGet]
    public async Task<IActionResult> GetAllMenuItems()
    {
        var menu = await _context.MenuItems
            .Include(m => m.Options)
                .ThenInclude(o => o.OptionMeta)
            .Select(m => new
            {
                m.Id,
                m.Name,
                m.CategoryId,
                m.Price,
                Image = m.Image ?? "/uploads/images/default.webp",
                m.Status,
                Options = m.Options.Select(o => new
                {
                    o.Id,
                    o.OptionName,
                    o.OptionType,
                    Metas = o.OptionMeta.Select(meta => new
                    {
                        meta.MetaKey,
                        meta.MetaValue
                    })
                })
            })
            .ToListAsync();

        return Ok(menu);
    }

    // GET: /api/Menu/category/{id}
    [HttpGet("category/{categoryId}")]
    public async Task<IActionResult> GetMenuByCategory(int categoryId)
    {
        var menu = await _context.MenuItems
            .Where(m => m.CategoryId == categoryId && m.Status)
            .Include(m => m.Options)
                .ThenInclude(o => o.OptionMeta)
            .Select(m => new
            {
                m.Id,
                m.Name,
                m.CategoryId,
                m.Price,
                Image = m.Image ?? "/uploads/images/default.webp",
                m.Status,
                Options = m.Options.Select(o => new
                {
                    o.Id,
                    o.OptionName,
                    o.OptionType,
                    Metas = o.OptionMeta.Select(meta => new
                    {
                        meta.MetaKey,
                        meta.MetaValue
                    })
                })
            })
            .ToListAsync();

        return Ok(menu);
    }

    // POST: /api/Menu
    [HttpPost]
    public async Task<IActionResult> AddMenuItem([FromForm] MenuItemDto dto)
    {
        if (dto == null)
            return BadRequest("Invalid data");

        string? fileName = null;
        if (dto.Image != null)
        {
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads/images");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(uploadsPath, fileName);
            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);
        }

        var menuItem = new MenuItemModel
        {
            Name = dto.Name,
            CategoryId = dto.CategoryId,
            Price = dto.Price,
            Status = dto.Status,
            Image = fileName
        };

        if (!string.IsNullOrEmpty(dto.Options))
        {
            var options = System.Text.Json.JsonSerializer.Deserialize<List<Options>>(dto.Options);
            menuItem.Options = options;
        }

        _context.MenuItems.Add(menuItem);
        await _context.SaveChangesAsync();

        return Ok(menuItem);
    }

    // PUT: /api/Menu/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMenuItem(int id, [FromForm] MenuItemDto dto)
    {
        var existing = await _context.MenuItems
            .Include(m => m.Options)
                .ThenInclude(o => o.OptionMeta)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (existing == null)
            return NotFound(new { message = "Menu item not found" });

        existing.Name = dto.Name;
        existing.CategoryId = dto.CategoryId;
        existing.Price = dto.Price;
        existing.Status = dto.Status;

        if (dto.Image != null)
        {
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads/images");
            if (!Directory.Exists(uploadsPath))
                Directory.CreateDirectory(uploadsPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(uploadsPath, fileName);
            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);

            existing.Image = fileName;
        }

        // Remove old options & metas
        if (existing.Options != null)
        {
            foreach (var opt in existing.Options)
            {
                if (opt.OptionMeta != null)
                    _context.optionMetas.RemoveRange(opt.OptionMeta);
            }
            _context.Options.RemoveRange(existing.Options);
        }

        if (!string.IsNullOrEmpty(dto.Options))
        {
            var options = System.Text.Json.JsonSerializer.Deserialize<List<Options>>(dto.Options);
            foreach (var option in options)
            {
                option.ProductId = existing.Id;
                _context.Options.Add(option);
            }
        }

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    // DELETE: /api/Menu/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMenuItem(int id)
    {
        var existing = await _context.MenuItems
            .Include(m => m.Options)
                .ThenInclude(o => o.OptionMeta)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (existing == null)
            return NotFound(new { message = "Menu item not found" });

        if (existing.Options != null)
        {
            foreach (var option in existing.Options)
            {
                if (option.OptionMeta != null)
                    _context.optionMetas.RemoveRange(option.OptionMeta);
            }
            _context.Options.RemoveRange(existing.Options);
        }

        _context.MenuItems.Remove(existing);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Menu item deleted successfully" });
    }
}


public class MenuItemDto
{
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public decimal Price { get; set; }
    public bool Status { get; set; }
    public string? Options { get; set; } // JSON string for options if any
    public IFormFile? Image { get; set; } // uploaded image
}
