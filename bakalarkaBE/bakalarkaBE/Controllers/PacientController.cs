using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class PacientController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public PacientController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        //get pacient (funguje aj ked nema poistovnu alebo bydlisko)
        [HttpGet("pacient/{rodneCislo}")]
        public async Task<ActionResult<List<Pacient>>> GetPacient(string rodneCislo)
        {
            var pacient = await _dbContext.Pacients.GroupJoin(_dbContext.Poistovnas,
                a => a.Idpoistovne, b => b.Idpoistovne,
                (a, b) => new
                {
                    Rodnecislo = a.Rodnecislo,
                    Meno = a.Meno,
                    Priezvisko = a.Priezvisko,
                    Ulica = a.Ulica,
                    Idpoistovne = a.Idpoistovne,
                    Poistenyvpoistovniod = a.Poistenyvpoistovniod,
                    Umrtie = a.Umrtie,
                    Idmesta = a.Idmesta,
                    Heslo = a.Heslo,
                    Rola = a.Rola,
                    Email = a.Email,
                    IdpoistovneNavigation = b,
                    IdmestaNavigation = a.IdmestaNavigation
                }).Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacient);
        }

        [HttpGet("alergie/{rodneCislo}")]
        public async Task<ActionResult<List<PacientAlergie>>> GetPacientoveAlergie(string rodneCislo)
        {
            var pacAlergie = await _dbContext.PacientAlergies.Join(_dbContext.Alergies,
                    a => a.Kodalergie, b => b.Kodalergie,
                    (a,b) => new PacientAlergie()
                    {
                        Rodnecislo = a.Rodnecislo,
                        Kodalergie = a.Kodalergie,
                        Informacie = a.Informacie,
                        KodalergieNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacAlergie);
        }

        [HttpGet("ochorenia/{rodneCislo}")]
        public async Task<ActionResult<List<Pacientoveochorenium>>> GetPacientoveOchorenia(string rodneCislo)
        {
            var pacOchorenia = await _dbContext.Pacientoveochorenia.Join(_dbContext.Ochorenia,
                a => a.Kodochorenia, b => b.Kodochorenia,
                (a,b) => new Pacientoveochorenium()
                {
                    Datumod = a.Datumod,
                    Datumdo = a.Datumdo,
                    Rodnecislo = a.Rodnecislo,
                    Kodochorenia = a.Kodochorenia,
                    Dalsiaspecifikacia = a.Dalsiaspecifikacia,
                    KodochoreniaNavigation = b
                })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacOchorenia);
        }

        [HttpGet("lieky/{rodneCislo}")]
        public async Task<ActionResult<List<Pacientovelieky>>> GetPacientoveLieky(string rodneCislo)
        {
            var pacLieky = await _dbContext.Pacientoveliekies.Join(_dbContext.Liekies, 
                    a => a.Registracnecislo, b => b.Registracnecislo,
                    (a,b) => new Pacientovelieky()
                    {
                        Rodnecislo = a.Rodnecislo,
                        Datumod = a.Datumod,
                        Datumdo = a.Datumdo,
                        Davkovanie = a.Davkovanie,
                        Registracnecislo = a.Registracnecislo,
                        RegistracnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacLieky);
        }

        [HttpGet("doktori/{rodneCislo}")]
        public async Task<ActionResult<List<PacientDoktor>>> GetPacientovyDoktori(string rodneCislo)
        {
            var pacDoktori = await _dbContext.PacientDoktors.Join(_dbContext.Doktors,
                a => a.Osobnecislo, b => b.Osobnecislo,
                (a,b) => new PacientDoktor()
                {
                    Rodnecislo = a.Rodnecislo,
                    Osobnecislo = a.Osobnecislo,
                    Datumod = a.Datumod,
                    OsobnecisloNavigation= b
                })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacDoktori);
        }

        [HttpGet("vysetreniaVZazname/{idZaznamu}")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> GetPacientoveZaznamy(int idZaznamu)
        {
            var pacZaznamy = await _dbContext.VysetrenieZaznams.Join(_dbContext.Vysetrenies, 
                    a => a.Kod ,b => b.Kod,
                    (a,b) => new VysetrenieZaznam()
                    {
                        Kod = a.Kod,
                        Idzaznam = a.Idzaznam,
                        Datum = a.Datum,
                        Vysledokvysetrenia = a.Vysledokvysetrenia,
                        IdzaznamNavigation = a.IdzaznamNavigation,
                        KodNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznamu).ToListAsync();

            return Ok(pacZaznamy);
        }

        [HttpGet("zaznamy/{rodneCislo}")]
        public async Task<ActionResult<List<Zaznam>>> GetPacientoveZaznamy(string rodneCislo)
        {
            var pacZaznamy = await _dbContext.Zaznams.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a,b) => new Zaznam()
                    {
                        Idzaznam = a.Idzaznam,
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Dovodnavstevy = a.Dovodnavstevy,
                        Datum = a.Datum,
                        Cas = a.Cas,
                        Doplnujuceinformacie = a.Doplnujuceinformacie,
                        Zaver = a.Zaver,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacZaznamy);
        }
        
        [HttpGet("zaznam/{idZaznam}")]
        public async Task<ActionResult<List<Zaznam>>> GetPacientovZaznam(int idZaznam)
        {
            var pacZaznamy = await _dbContext.Zaznams.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a,b) => new Zaznam()
                    {
                        Idzaznam = a.Idzaznam,
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Dovodnavstevy = a.Dovodnavstevy,
                        Datum = a.Datum,
                        Cas = a.Cas,
                        Doplnujuceinformacie = a.Doplnujuceinformacie,
                        Zaver = a.Zaver,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznam).ToListAsync();

            return Ok(pacZaznamy);
        }

        [HttpGet("listky/{rodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> GetPacientoveListky(string rodneCislo)
        {
            var pacLisky = await _dbContext.Odporucacilistoks.Join( _dbContext.Oddelenies,
                a => new { a.Kododdelenia, a.Idnemocnice}, b => new { b.Kododdelenia, b.Idnemocnice},
                (a,b) => new Odporucacilistok()
                {
                    Datumodporucenia = a.Datumodporucenia,
                    Kododdelenia = a.Kododdelenia,
                    Idnemocnice = a.Idnemocnice,
                    Osobnecislo = a.Osobnecislo,
                    Rodnecislo = a.Rodnecislo,
                    Oddelenie = b
                }).Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a,b) => new Odporucacilistok()
                    {
                        Datumodporucenia = a.Datumodporucenia,
                        Kododdelenia = a.Kododdelenia,
                        Idnemocnice = a.Idnemocnice,
                        Osobnecislo = a.Osobnecislo,
                        Rodnecislo = a.Rodnecislo,
                        Oddelenie = a.Oddelenie,
                        OsobnecisloNavigation = b
                    }).Join(_dbContext.Pacients,
                    a => a.Rodnecislo, b => b.Rodnecislo,
                    (a,b) => new Odporucacilistok()
                    {
                        Datumodporucenia = a.Datumodporucenia,
                        Kododdelenia = a.Kododdelenia,
                        Idnemocnice = a.Idnemocnice,
                        Osobnecislo = a.Osobnecislo,
                        Rodnecislo = a.Rodnecislo,
                        Oddelenie = a.Oddelenie,
                        OsobnecisloNavigation = a.OsobnecisloNavigation,
                        RodnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacLisky);
        }

        [HttpGet("listkyv2/{rodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> test(string rodneCislo)
        {
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();
            return Ok(lisok);
        }

        [HttpPut("zmenaUdajov")]
        public async Task<ActionResult<List<Pacient>>> zmenaUdajov(Pacient pacient)
        {
            var dbPacient = await _dbContext.Pacients.FindAsync(pacient.Rodnecislo);

            if (dbPacient == null)
            {
                return BadRequest(new { Message = "Pacient neexistuje!" });
            }

            if (dbPacient.Heslo != pacient.Heslo)
            {
                return BadRequest(new { Message = "Pôvodné heslo nie je rovnaké!" });
            }

            dbPacient.Meno = pacient.Meno;
            dbPacient.Priezvisko = pacient.Priezvisko;
            dbPacient.Ulica = pacient.Ulica;
            dbPacient.Idmesta = pacient.Idmesta;
            dbPacient.Heslo = pacient.Heslo;
            dbPacient.Email = pacient.Email;

            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacients.ToListAsync());
        }
        
        [HttpPut("zmenaHesla")]
        public async Task<ActionResult<List<Pacient>>> zmenaHesla(HesloUpdate hesloUpdate)
        {
            var dbPacient = await _dbContext.Pacients.FindAsync(hesloUpdate.rodnecislo);

            if (dbPacient == null)
            {
                return BadRequest(new { Message = "Pacient neexistuje!" });
            }

            if (hesloUpdate.stareheslo != dbPacient.Heslo)
            {
                return BadRequest(new { Message = "Pôvodné heslo nie je rovnaké!" });
            }

            dbPacient.Heslo = hesloUpdate.noveheslo;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacients.ToListAsync());
        }
    }
}