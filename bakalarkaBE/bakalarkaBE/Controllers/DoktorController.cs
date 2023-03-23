using bakalarkaBE.Models;
using Microsoft.AspNetCore.Components.Web;
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

        [HttpGet("doktorPacienti/{osobnecislo}")]
        public async Task<ActionResult<List<PacientDoktor>>> GetDoktorPacienti(string osobnecislo)
        {
            /*var docPacienti = _dbContext.PacientDoktors.Join(_dbContext.Doktors, 
                a => a.Osobnecislo, b => b.Osobnecislo,
                (a,b) => new PacientDoktor()
                {
                    Osobnecislo = a.Osobnecislo,
                    Rodnecislo = a.Rodnecislo,
                    Datumod = a.Datumod,
                    OsobnecisloNavigation = b
                });
                */

            var docPacienti = await
                _dbContext.PacientDoktors
                    .Include(a => a.OsobnecisloNavigation)
                    .Include(a => a.RodnecisloNavigation)
                    .Where(a => a.Osobnecislo == osobnecislo).ToListAsync();

            return Ok(docPacienti);
        }

        [HttpGet("/allPacients")]
        public async Task<ActionResult<List<Pacient>>> GetAllPacients()
        {
            return Ok(await _dbContext.Pacients.ToListAsync());
        }

        [HttpGet("/allAlergies")]
        public async Task<ActionResult<List<Alergie>>> GetAllAlergies()
        {
            return Ok(await _dbContext.Alergies.ToListAsync());
        }

        [HttpPost("/pridajPacienta")]
        public async Task<ActionResult<List<PacientDoktor>>> PridajPacienta(PacientDoktor pacient)
        {
            pacient.Datumod = DateOnly.FromDateTime(DateTime.Now);
            _dbContext.Add(pacient);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

    }
}