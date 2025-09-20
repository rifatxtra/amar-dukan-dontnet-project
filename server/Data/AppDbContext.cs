using Microsoft.EntityFrameworkCore;
using RestaurantOrderManagement.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UserModel> Users { get; set; }
    public DbSet<CategoryModel> Categories { get; set; }
    public DbSet<MenuItemModel> MenuItems { get; set; }
    public DbSet<OrderModel> Orders { get; set; }
    public DbSet<OrderMetaModel> OrderMeta { get; set; }
    public DbSet<PaymentModel> Payments { get; set; }
    public DbSet<MenuItemModel> MenuItemModels { get; set; }
    public DbSet<Options> Options { get; set; }
    public DbSet<OptionMeta> optionMetas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // One MenuItem → Many Options
        modelBuilder.Entity<Options>()
            .HasOne(o => o.MenuItem)
            .WithMany(m => m.Options)
            .HasForeignKey(o => o.ProductId);

        // One Option → Many OptionMetas
        modelBuilder.Entity<Options>()
            .HasMany(o => o.OptionMeta)
            .WithOne(m => m.Option)
            .HasForeignKey(m => m.OptionId);

        // One Order → Many OrderMeta
        modelBuilder.Entity<OrderMetaModel>()
            .HasOne(m => m.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(m => m.OrderId);

        base.OnModelCreating(modelBuilder);
    }
}
