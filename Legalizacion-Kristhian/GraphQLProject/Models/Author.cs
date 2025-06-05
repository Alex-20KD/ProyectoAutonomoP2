using System.ComponentModel.DataAnnotations;

namespace GraphQLProject.Models
{
    public class Author
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Bio { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
    }
}
