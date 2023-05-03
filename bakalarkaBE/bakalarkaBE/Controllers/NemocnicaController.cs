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
        public async Task<ActionResult<List<Nemocnica>>> GetUdajeONemocniciNemocnica(string idNemocnice)
        {
            return Ok(await _dbContext.Nemocnicas
                .Include(a => a.IdmestaNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }

        [HttpGet("doktoriVNemocnici/{idNemocnice}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoriVNemocniciNemocnica(string idNemocnice)
        {
            return Ok(await _dbContext.Doktors
                .Include(a => a.SpecializaciaDoktors)
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }

        [HttpPost("pridajDoktora")]
        public async Task<ActionResult<List<Doktor>>> PostPridajDoktoraNemocica(Doktor doktor)
        {
            return Ok(await _dbContext.Doktors.ToListAsync());
        }

        [HttpGet("oddeleniaNemocnice/{idNemocnice}")]
        public async Task<ActionResult<List<Doktor>>> GetOddeleniaNemocniceNemocnica(string idNemocnice)
        {
            var oddelenia = await _dbContext.Oddelenies
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync();
            
            return Ok(oddelenia);
        }

        [HttpPost("pridajOddelenie")]
        public async Task<ActionResult<List<Doktor>>> PostPridajOddelenieNemocica(Oddelenie oddelenie)
        {
            return Ok(await _dbContext.Oddelenies.ToListAsync());
        }

        [HttpPut("zmenOddelenieDoktora")]
        public async Task<ActionResult<List<Doktor>>> PutZmenOddelenieDoktoraNemocnica(Doktor doktor)
        {
            return Ok(await _dbContext.Doktors.ToListAsync());
        }

    }
}