public class CreateOrderDto
{
    public int UserId { get; set; }
    public decimal Total { get; set; } // Changed from int to decimal
    public string Status { get; set; } = "Processing"; // Default to Processing if not provided
public int Table { get; set; }
    public List<OrderItemDto> Items { get; set; }
}
