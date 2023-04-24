using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class NemocnicaController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public NemocnicaController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("udajeNemocnice/{idNemocnice}")]
        public async Task<ActionResult<List<Nemocnica>>> GetUdajeONemocnici(string idNemocnice)
        {
            return Ok(await _dbContext.Nemocnicas
                .Include(a => a.IdmestaNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }

        [HttpGet("doktoriVNemocnici/{idNemocnice}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoriVNemocnici(string idNemocnice)
        {
            return Ok(await _dbContext.Doktors
                .Include(a => a.SpecializaciaDoktors)
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }
        
        
    }
}