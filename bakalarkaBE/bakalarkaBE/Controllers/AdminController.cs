using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public AdminController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("nemocniceSUdajmi")]
        public async Task<ActionResult<List<Nemocnica>>> GetNemocniceSUdajmiAdmin()
        {
            return Ok(await _dbContext.Nemocnicas.Include(a => a.IdmestaNavigation)
                .ToListAsync());
        }

        [HttpPost("PridajNemocnicu")]
        public async Task<ActionResult<List<Nemocnica>>> PostPridajNemocnicuAdmin(Nemocnica nemocnica)
        {
            var dbNemocnica = await _dbContext.Nemocnicas.FindAsync(nemocnica.Idnemocnice);

            if (dbNemocnica != null)
            {
                return BadRequest(new { Message = "Nemocica s daným ID už existuje v systéme!" });
            }

            _dbContext.Add(nemocnica);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Nemocnicas.ToListAsync());
        }
    }
}