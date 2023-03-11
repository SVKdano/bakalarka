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
        
        //get pacienti aj bez poistovne alebo bydliska
        [HttpGet("pacienti")]
        public async Task<ActionResult<List<Pacient>>> GetAllPacients()
        {
            var pacienti = await _dbContext.Pacients.GroupJoin(_dbContext.Poistovnas,
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
                }).ToListAsync();

            return Ok(pacienti);
        }
    }
}