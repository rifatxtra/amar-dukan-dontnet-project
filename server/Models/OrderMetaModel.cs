public class OrderMetaModel
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string ProductName { get; set; }
    public string CategoryName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal SubTotal { get; set; }
    public OrderModel Order { get; set; }
}
