using System.ComponentModel.DataAnnotations.Schema;
[Table("menuitems")]
public class MenuItemModel
{
    
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public decimal Price { get; set; }
    public string? Image { get; set; }
    public bool Status { get; set; } = true;
    public ICollection<Options>? Options { get; set; }
}
