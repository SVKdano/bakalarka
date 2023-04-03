using System.Collections.Immutable;
using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class ZdielanieController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public ZdielanieController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("/alergieZdielanie/{zdielajuci}/{cielovy}/{rodnecislo}/{datumdo}")]
        public async Task<ActionResult<List<Alergie>>> TestController(string zdielajuci, string cielovy, string rodnecislo, string datumdo)
        {
            var alergie = await _dbContext.PacientAlergies.Where(a => a.Rodnecislo == rodnecislo).ToArrayAsync();

            if (alergie == null)
            {
                return BadRequest();
            }
            List<string> kodyAlergii = new List<string>();
            
            for (int i = 0; i < alergie.Length; i++)
            {
                kodyAlergii.Add(alergie[i].Kodalergie);
            }

            foreach (var VARIABLE in kodyAlergii)
            {
                var alergiaZdiel = new Alergiazdielanie
                {
                    Zdielajuci = zdielajuci,
                    Cielovy = cielovy,
                    Rodnecislo = rodnecislo,
                    Kodalergie = VARIABLE,
                    Datumdo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd")
                };

                _dbContext.Add(alergiaZdiel);
            }

            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Alergiazdielanies.ToListAsync());
        }

        [HttpGet("/allOddeleniaForShare")]
        public async Task<ActionResult<List<Oddelenie>>> GetAllOddelenia()
        {
            var dbOddelenia = await _dbContext.Oddelenies
                .Include(a => a .IdnemocniceNavigation)
                .ToListAsync();

            return Ok(dbOddelenia);
        }
        
        [HttpGet("/allDoktoriForShare")]
        public async Task<ActionResult<List<Doktor>>> GetAllDoktori()
        {
            var dbDoktori = await _dbContext.Doktors
                .ToListAsync();

            return Ok(dbDoktori);
        }
    }
}