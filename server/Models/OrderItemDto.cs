public class OrderItemDto
{
    public string ProductName { get; set; }
    public int CategoryId { get; set; } // Matches frontend's "categoryId"
    public int Quantity { get; set; }
    public decimal Price { get; set; } // Changed from int to decimal
}