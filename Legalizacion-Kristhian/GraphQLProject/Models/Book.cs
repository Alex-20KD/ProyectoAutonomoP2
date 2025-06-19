using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraphQLProject.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        
        // Foreign key
        public int AuthorId { get; set; }
        
        // Navigation property
        [ForeignKey("AuthorId")]
        public virtual Author Author { get; set; } = null!;
    }
}
