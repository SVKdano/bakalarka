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
    }
}