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
        
        //--------------------ODPORUCACIE LISTKY------------------
        [HttpGet("/allOddelenia")]
        public async Task<ActionResult<List<Ochorenium>>> GetAllOddelenia()
        {
            var retruned = await _dbContext.Oddelenies
                .Include(a => a.IdnemocniceNavigation).ToListAsync();
            return Ok(retruned);
        }
        
        [HttpGet("listky/{rodneCislo}/{osobneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> GetPacientoveListky(string rodneCislo, string osobneCislo)
        {
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Osobnecislo == osobneCislo).ToListAsync();
            return Ok(lisok);
        }

        [HttpPost("/pridajListok")]
        public async Task<ActionResult<List<Odporucacilistok>>> PridajListok(Odporucacilistok listok)
        {
            var dbListok = await _dbContext.Odporucacilistoks
                .FindAsync(listok.Datumodporucenia, listok.Kododdelenia, listok.Idnemocnice,
                    listok.Osobnecislo, listok.Rodnecislo);

            if (dbListok != null)
            {
                return BadRequest(new { Message = "Listok na pridanie už existuje!" });
            }

            _dbContext.Add(listok);
            await _dbContext.SaveChangesAsync();
            
            return Ok(listok);
        }

        [HttpDelete("/vymazListok/{DatumOdporucenia}/{KodOddelenia}/{IdNemocnice}/{OsobneCislo}/{RodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> 
            VymazListok(string DatumOdporucenia, string KodOddelenia, string IdNemocnice, string OsobneCislo, string RodneCislo)
        {
            var datum = DateOnly.Parse(DatumOdporucenia);
            var dbListok = await _dbContext.Odporucacilistoks
                .FindAsync(datum, KodOddelenia, IdNemocnice,
                    OsobneCislo, RodneCislo);

            if (dbListok == null)
            {
                return BadRequest(new { Message = "Lístok na odstanenie neexistuje" });
            }

            _dbContext.Remove(dbListok);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Odporucacilistoks.ToListAsync());
        }
        
        //---------------------ZAZNAM a VYSETRENIE--------------------------
        [HttpPost("/pridajZaznam")]
        public async Task<ActionResult<int>> PridajZaznam(Zaznam zaznam)
        {
            _dbContext.Add(zaznam);
            await _dbContext.SaveChangesAsync();

            return Ok(zaznam.Idzaznam);
        }

        [HttpPut("/updateZaznam")]
        public async Task<ActionResult<List<Zaznam>>> UpdateZaznam(Zaznam zaznam)
        {
            var dbZaznam = await _dbContext.Zaznams.FindAsync(zaznam.Idzaznam);

            if (dbZaznam == null)
            {
                return BadRequest(new { Message = "Záznam na aktualizaciu neexistuje" });
            }

            dbZaznam.Dovodnavstevy = zaznam.Dovodnavstevy;
            dbZaznam.Doplnujuceinformacie = zaznam.Doplnujuceinformacie;
            dbZaznam.Zaver = zaznam.Zaver;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Zaznams.ToListAsync());
        }

        [HttpGet("/getAllVysetria")]
        public async Task<ActionResult<List<Vysetrenie>>> GetAllVysetrenia()
        {
            return Ok(await _dbContext.Vysetrenies.ToListAsync());
        }

        [HttpPost("/pridajVysetrenieZaznamu")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> PridajVysetrenieZaznamu(VysetrenieZaznam vysetrenie)
        {
            var dbVysetrenie = await _dbContext.VysetrenieZaznams
                .FindAsync(vysetrenie.Kod, vysetrenie.Idzaznam);

            if (dbVysetrenie != null)
            {
                return BadRequest(new { Message = "Vysetrenie v zázname už existuje!" });
            }

            _dbContext.Add(vysetrenie);
            await _dbContext.SaveChangesAsync();
            
            return Ok(vysetrenie);
        }

        [HttpDelete("/vymazVystrenie/{kod}/{idzaznam}")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> DeleteVysetrenieZaznam(string kod, int idzaznam)
        {
            var dbVysetrenieZaznam = await _dbContext.VysetrenieZaznams
                .FindAsync(kod, idzaznam);

            if (dbVysetrenieZaznam == null)
            {
                return BadRequest(new { Message = "Vysetrenie zo záznamu na odstanenie neexistuje" });
            }

            _dbContext.Remove(dbVysetrenieZaznam);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.VysetrenieZaznams.ToListAsync());
        }

    }
}