using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantOrderManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;
    public OrderController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto request)
    {
        // 1. Create the main Order entry
        var order = new OrderModel
        {
            UserId = request.UserId,
            Total = request.Total,
            Status = request.Status,
        };
        _context.Orders.Add(order);
        await _context.SaveChangesAsync(); // This saves the order and populates its ID

        // 2. Process each item and link it to the newly created order
        foreach (var item in request.Items)
        {
            // Fetch category name based on the CategoryId from the DTO
            string categoryName = await _context.Categories
                .Where(c => c.Id == item.CategoryId)
                .Select(c => c.Name)
                .FirstOrDefaultAsync();

            var orderMeta = new OrderMetaModel
            {
                OrderId = order.Id, // Use the ID from the newly created order
                ProductName = item.ProductName,
                CategoryName = categoryName,
                Quantity = item.Quantity,
                Price = item.Price,
                SubTotal = item.Quantity * item.Price
            };

            _context.OrderMeta.Add(orderMeta);
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Order and OrderMeta created successfully" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound();
        // 2. Manually fetch the associated OrderMeta items based on the order's ID.
        var orderItems = await _context.OrderMeta
            .Where(om => om.OrderId == order.Id) // Filter for items belonging to this specific order
            .ToListAsync(); // Execute the query to get all matching items

        // 3. Assign the fetched items to the OrderModel's Items property.
        //    Ensure 'order.Items' is initialized if it's nullable or potentially null.
        order.Items = orderItems ?? new List<OrderMetaModel>();
        return Ok(order);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;

        var totalOrders = await _context.Orders.CountAsync();

        var orders = await _context.Orders
            .OrderByDescending(o => o.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new
            {
                o.Id,
                o.UserId,
                o.Total,
                o.Status,
                o.CreatedAt,
                Items = _context.OrderMeta
                    .Where(om => om.OrderId == o.Id)
                    .Select(om => new
                    {
                        om.Id,
                        om.ProductName,
                        om.CategoryName,
                        om.Quantity,
                        om.Price,
                        om.SubTotal
                    })
                    .ToList()
            })
            .ToListAsync();

        return Ok(new
        {
            totalCount = totalOrders,
            currentPage = page,
            pageSize,
            totalPages = (int)Math.Ceiling(totalOrders / (double)pageSize),
            data = orders
        });
    }


    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto request)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
        if (order == null)
            return NotFound(new { message = "Order not found" });

        // Update status
        order.Status = request.Status;

        _context.Orders.Update(order);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Order status updated successfully", order });
    }


}