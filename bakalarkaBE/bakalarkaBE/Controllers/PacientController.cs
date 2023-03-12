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
        public async Task<ActionResult<List<Pacientoveochorenium>>> GetPacientoveLieky(string rodneCislo)
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
    }
}