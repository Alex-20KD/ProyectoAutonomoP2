using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateAdopcionDto
    {
        [Required]
        public DateTime FechaAdopcion { get; set; }

        [Required]
        [StringLength(50)]
        public string Estado { get; set; }

        [Required]
        public int MascotaId { get; set; }

        [Required]
        public int AdoptanteId { get; set; }
    }
}
