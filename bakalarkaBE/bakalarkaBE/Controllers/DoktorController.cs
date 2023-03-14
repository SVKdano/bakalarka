using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class DoktorController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public DoktorController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("doktor/{osobnecislo}")]
        public async Task<ActionResult<List<Doktor>>> GetPacient(string osobnecislo)
        {
            var doktor = await _dbContext.Doktors
                .Include(a => a.SpecializaciaDoktors)
                .ThenInclude(b => b.KodspecializacieNavigation)
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Where(a => a.Osobnecislo == osobnecislo).ToListAsync();
            return Ok(doktor);
        }
        
        [HttpGet("doktoriOddelenia/{kododdelenia}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoriOddelenia(string kododdelenia)
        {
            var doktor = await _dbContext.Doktors
                .Include(a => a.Oddelenie)
                .Where(a => a.Oddelenie.Kododdelenia == kododdelenia).ToListAsync();
            return Ok(doktor);
        }
    }
}