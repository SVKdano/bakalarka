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

        //--------------------ALERGIE-----------------------
        [HttpPost("/pridajAlergiu")]
        public async Task<ActionResult<List<PacientAlergie>>> PridajAlergiu(PacientAlergie alergia)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(alergia.Rodnecislo, alergia.Kodalergie);

            if (dbAlergia != null)
            {
                return BadRequest(new { Message = "Alergia už existuje! Upravte už existujúcu!" });
            }
            _dbContext.Add(alergia);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }

        [HttpPut("/updateAlergiu")]
        public async Task<ActionResult<List<PacientAlergie>>> UpdateAlergiu(PacientAlergie alergia)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(alergia.Rodnecislo, alergia.Kodalergie);

            if (dbAlergia == null)
            {
                return BadRequest(new { Message = "Alergia na aktualizaciu neexistuje" });
            }

            dbAlergia.Informacie = alergia.Informacie;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }

        [HttpDelete("/zmazAlergiu/{rodneCislo}/{kodAlergie}")]
        public async Task<ActionResult<List<PacientAlergie>>> DeleteAlergiu(string rodneCislo, string kodAlergie)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(rodneCislo, kodAlergie);

            if (dbAlergia == null)
            {
                return BadRequest(new { Message = "Alergia na zmazanie neexistuje" });
            }

            _dbContext.Remove(dbAlergia);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }
        
        //-----------------------LIEKY-------------------------
        [HttpGet("/allLieky")]
        public async Task<ActionResult<List<Lieky>>> GetAllLieky()
        {
            return Ok(await _dbContext.Liekies.ToListAsync());
        }

        [HttpPost("/pridajLiek")]
        public async Task<ActionResult<List<Pacientovelieky>>> PridajPacientovLiek(Pacientovelieky liek)
        {

            var dbLiek = await _dbContext.Pacientoveliekies.FindAsync(liek.Rodnecislo, liek.Datumod, liek.Registracnecislo);

            if (dbLiek != null)
            {
                return BadRequest(new { Message = "Liek už existuje! Upravte už existujúci!" });
            }

            _dbContext.Add(liek);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveliekies.ToListAsync());
        }

        [HttpPut("/ukonciUzivanie")]
        public async Task<ActionResult<List<Pacientovelieky>>> SkonciUzivnanie(Pacientovelieky liek)
        {
            var dbLiek = await _dbContext.Pacientoveliekies.FindAsync(liek.Rodnecislo, liek.Datumod, liek.Registracnecislo);

            if (dbLiek == null)
            {
                return BadRequest(new { Message = "Liek na zmenu neexistuje!" });
            }

            dbLiek.Davkovanie = liek.Davkovanie;
            dbLiek.Datumdo = liek.Datumdo;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveliekies.ToListAsync());
        }
        
        //--------------------OCHORENIA-----------------
        [HttpGet("/allOchorenia")]
        public async Task<ActionResult<List<Ochorenium>>> GetAllOchorenia()
        {
            return Ok(await _dbContext.Ochorenia.ToListAsync());
        }

        [HttpPost("/pridajOchorenie")]
        public async Task<ActionResult<List<Pacientoveochorenium>>> PridajPacientoveOchorenie(
            Pacientoveochorenium ochorenie)
        {
            var dbOchorenie = await _dbContext.Pacientoveochorenia
                .FindAsync(ochorenie.Datumod, ochorenie.Rodnecislo, ochorenie.Kodochorenia);

            if (dbOchorenie != null)
            {
                return BadRequest(new { Message = "Ochorenie už existuje! Upravte už existujúce!" });
            }

            _dbContext.Add(ochorenie);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Pacientoveochorenia.ToListAsync());
        }
        
        [HttpPut("/ukonciOchorenie")]
        public async Task<ActionResult<List<Pacientoveochorenium>>> UkonciOchorenie(Pacientoveochorenium ochorenie)
        {
            var dbOchorenie = await _dbContext.Pacientoveochorenia
                .FindAsync(ochorenie.Datumod, ochorenie.Rodnecislo, ochorenie.Kodochorenia);

            if (dbOchorenie == null)
            {
                return BadRequest(new { Message = "Ochorenie na zmenu neexistuje!" });
            }

            dbOchorenie.Dalsiaspecifikacia = ochorenie.Dalsiaspecifikacia;
            dbOchorenie.Datumdo = ochorenie.Datumdo;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveochorenia.ToListAsync());
        }

    }
}