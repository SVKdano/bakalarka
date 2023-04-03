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
        
        [HttpGet("/liekyZdielanie/{zdielajuci}/{cielovy}/{rodnecislo}/{datumdo}")]
        public async Task<ActionResult<List<Lieky>>> LiekyZdielanie(string zdielajuci, string cielovy, string rodnecislo, string datumdo)
        {
            var lieky = await _dbContext.Pacientoveliekies.Where(a => a.Rodnecislo == rodnecislo).ToArrayAsync();

            if (lieky == null)
            {
                return BadRequest();
            }
            List<Tuple<string,string>> kodADatumLieku = new List<Tuple<string,string>>();
            
            for (int i = 0; i < lieky.Length; i++)
            {
                kodADatumLieku.Add(Tuple.Create(lieky[i].Registracnecislo,lieky[i].Datumod.ToString("yyyy-MM-dd")));
            }

            foreach (var VARIABLE in kodADatumLieku)
            {
                var liekyZdiel = new Liekyzdielanie
                {
                    Zdielajuci = zdielajuci,
                    Cielovy = cielovy,
                    Registracnecislo = VARIABLE.Item1,
                    Rodnecislo = rodnecislo,
                    Datumod = DateOnly.ParseExact(VARIABLE.Item2, "yyyy-MM-dd"),
                    DatumdoZdielanie = DateOnly.ParseExact(datumdo, "yyyy-MM-dd")
                };
                
                _dbContext.Add(liekyZdiel);
            }

            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Liekyzdielanies.ToListAsync());
        }
        
        [HttpGet("/ochoreniaZdielanie/{zdielajuci}/{cielovy}/{rodnecislo}/{datumdo}")]
        public async Task<ActionResult<List<Lieky>>> OchoreniaZdielanie(string zdielajuci, string cielovy, string rodnecislo, string datumdo)
        {
            var ochorenia = await _dbContext.Pacientoveochorenia.Where(a => a.Rodnecislo == rodnecislo).ToArrayAsync();

            if (ochorenia == null)
            {
                return BadRequest();
            }
            List<Tuple<string,string>> kodADatumLieku = new List<Tuple<string,string>>();
            
            for (int i = 0; i < ochorenia.Length; i++)
            {
                kodADatumLieku.Add(Tuple.Create(ochorenia[i].Kodochorenia,ochorenia[i].Datumod.ToString("yyyy-MM-dd")));
            }

            foreach (var VARIABLE in kodADatumLieku)
            {
                var ochoreniaZdiel = new Ochoreniazdielanie
                {
                    Zdielajuci = zdielajuci,
                    Cielovy = cielovy,
                    Kodochorenia = VARIABLE.Item1,
                    Rodnecislo = rodnecislo,
                    Datumod = DateOnly.ParseExact(VARIABLE.Item2, "yyyy-MM-dd"),
                    DatumdoZdielanie = DateOnly.ParseExact(datumdo, "yyyy-MM-dd")
                };
                
                _dbContext.Add(ochoreniaZdiel);
            }

            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Ochoreniazdielanies.ToListAsync());
        }
    }
}