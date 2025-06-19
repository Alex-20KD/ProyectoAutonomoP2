using System.ComponentModel.DataAnnotations;

namespace GraphQLProject.GraphQL.Types
{
    public class AddAuthorInput
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Bio { get; set; } = string.Empty;
    }


    public class AddBookInput
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        public DateTime PublishedDate { get; set; }
        
        [Required]
        public int AuthorId { get; set; }
    }

    public class UpdateBookInput
    {
        [Required]
        public int Id { get; set; }
        
       
        public DateTime? PublishedDate { get; set; }
        
        public int? AuthorId { get; set; }
    }
}
