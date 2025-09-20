using MailKit.Net.Smtp;
using MimeKit;

namespace RestaurantAPI.Services
{
    public class EmailService
    {
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUser = "your-email@gmail.com";  // Replace
        private readonly string _smtpPass = "your-app-password";    // Replace (App Password for Gmail)

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Restaurant", _smtpUser));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;
            message.Body = new TextPart("html") { Text = body };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(_smtpUser, _smtpPass);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
