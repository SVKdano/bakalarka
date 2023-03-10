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

        //return pacient s mestom a poistovnou
        [HttpGet("allPacients")]
        public async Task<ActionResult<List<Pacient>>> GetAllPacients()
        {
            return Ok(await _dbContext.Pacients.Join(_dbContext.Poistovnas,
                a => a.Idpoistovne, b => b.Idpoistovne,
                (a, b) => new Pacient()
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
                }).Join(_dbContext.Mesta,
                a => a.Idmesta, b => b.Idmesta,
                (a, b) => new Pacient()
                { Rodnecislo = a.Rodnecislo,
                    Meno = a.Meno,
                    Priezvisko = a.Priezvisko,
                    Ulica = a.Ulica,
                    Idpoistovne = a.Idpoistovne,
                    Poistenyvpoistovniod = a.Poistenyvpoistovniod,
                    Umrtie = a.Umrtie,
                    Idmesta = a.Idmesta,
                    Heslo = a.Heslo,
                    Rola = a.Rola,
                    IdpoistovneNavigation = a.IdpoistovneNavigation,
                    IdmestaNavigation = b
                }).ToListAsync());
        }
    }
}