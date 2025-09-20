using System.ComponentModel.DataAnnotations.Schema;

public class Options
{
    public int Id { get; set; }
    [Column("product_id")]
    public int ProductId { get; set; }
    [Column("option_name")]
    public string OptionName { get; set; }

    [Column("option_type")]
    public string OptionType { get; set; }

    // navigation
    [ForeignKey("ProductId")]
    // navigation back to MenuItem
    public MenuItemModel? MenuItem { get; set; }

    public ICollection<OptionMeta>? OptionMeta { get; set; }
}