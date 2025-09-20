using System.ComponentModel.DataAnnotations.Schema;

[Table("optionmeta")]
public class OptionMeta
{
    public int Id { get; set; }
    public int OptionId { get; set; }   // FK to Options
    public string MetaKey { get; set; }
    public string MetaValue { get; set; }

    // Navigation property
    [ForeignKey("OptionId")]
    public Options? Option { get; set; }
}
