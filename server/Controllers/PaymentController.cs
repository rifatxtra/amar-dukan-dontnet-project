using Microsoft.AspNetCore.Mvc;
using Stripe;
using RestaurantOrderManagement.Models;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly AppDbContext _context;
    public PaymentController(AppDbContext context) => _context = context;

    [HttpPost("create")]
    public async Task<IActionResult> CreatePayment([FromBody] PaymentModel paymentRequest)
    {
        // Create Stripe PaymentIntent
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(paymentRequest.Amount * 100),
            Currency = paymentRequest.Currency,
            PaymentMethodTypes = new List<string> { "card" }
        };
        var service = new PaymentIntentService();
        var paymentIntent = service.Create(options);

        // Save to DB
        paymentRequest.PaymentStatus = "pending";
        paymentRequest.TransactionId = paymentIntent.Id;
        _context.Payments.Add(paymentRequest);
        await _context.SaveChangesAsync();

        return Ok(new { clientSecret = paymentIntent.ClientSecret });
    }

    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmPayment([FromBody] PaymentModel paymentConfirm)
    {
        var payment = await _context.Payments.FindAsync(paymentConfirm.Id);
        if (payment == null) return NotFound();

        payment.PaymentStatus = paymentConfirm.PaymentStatus;
        // Update order status if succeeded
        if (payment.PaymentStatus == "succeeded")
        {
            var order = await _context.Orders.FindAsync(payment.OrderId);
            if (order != null) order.Status = "completed";
        }

        await _context.SaveChangesAsync();
        return Ok(payment);
    }
}
