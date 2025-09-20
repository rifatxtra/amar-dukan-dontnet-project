public class OrderModel
{
    public int Id { get; set; }
    public int? UserId { get; set; }       // nullable for guest
    public decimal Total { get; set; }
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<OrderMetaModel> Items { get; set; }
}
