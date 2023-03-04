using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class PacientController : ControllerBase
    {
        private readonly BakalarkaContext _dbContext;

        public PacientController(BakalarkaContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("allPacients")]
        public async Task<ActionResult<List<Pacient>>> GetAllPacients()
        {
            return Ok(await _dbContext.Pacients.ToListAsync());
        }
    }
}