public class PaymentModel
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public string PaymentStatus { get; set; } = "pending"; // pending, succeeded, failed
    public string PaymentMethod { get; set; } = "stripe";
    public string TransactionId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
