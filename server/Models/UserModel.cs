namespace RestaurantOrderManagement.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // store hashed password
        public string Role { get; set; } = "customer"; // admin, staff, customer
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
