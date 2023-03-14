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
                _dbContext.Pacients.FirstOrDefaultAsync(a => a.Rodnecislo == user.rodneCislo);

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
    }
}
