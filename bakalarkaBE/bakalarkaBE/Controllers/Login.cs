using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class Login : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public Login(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<ActionResult<List<Pacient>>> GetPacient(LoginDTO user)
        {
            var possibleUser = await 
                _dbContext.Pacients.FirstOrDefaultAsync(a => a.Rodnecislo == user.Cislo);

            if (possibleUser == null)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            if (possibleUser.Heslo != user.heslo)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            return Ok(possibleUser);
        }

        [HttpPost("/registraciaPacient")]
        public async Task<ActionResult<List<Pacient>>> RegisterPacient(Pacient pacient)
        {
            if (_dbContext.Pacients.Any(a => a.Rodnecislo == pacient.Rodnecislo))
            {
                return BadRequest(new { Message = "Už ste registrovaný, pokračujte prosím na prihlásenie!" });
            }

            var regPacient = new Pacient
            {
                Rodnecislo = pacient.Rodnecislo,
                Meno = pacient.Meno,
                Priezvisko = pacient.Priezvisko,
                Ulica = pacient.Ulica,
                Idpoistovne = pacient.Idpoistovne,
                Poistenyvpoistovniod = pacient.Poistenyvpoistovniod,
                Idmesta = pacient.Idmesta,
                Heslo = pacient.Heslo,
                Rola = "pacient",
                Email = pacient.Email
            };

            _dbContext.Pacients.Add(regPacient);
            await _dbContext.SaveChangesAsync();
            return Ok(regPacient);
        }
        
        [HttpPost("loginDoktor")]
        public async Task<ActionResult<List<Doktor>>> GetDoktor(LoginDTO user)
        {
            var possibleUser = await 
                _dbContext.Doktors.FirstOrDefaultAsync(a => a.Osobnecislo == user.Cislo);

            if (possibleUser == null)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            if (possibleUser.Heslo != user.heslo)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            return Ok(possibleUser);
        }

        [HttpGet("/allPoistovne")]
        public async Task<ActionResult<List<Poistovna>>> GetPoistovne()
        {
            return Ok(await _dbContext.Poistovnas.ToListAsync());
        }

        [HttpGet("/allMesta")]
        public async Task<ActionResult<List<Mestum>>> GetMesta()
        {
            return Ok(await _dbContext.Mesta.ToListAsync());
        }
    }
}
