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
        public async Task<ActionResult<List<Nemocnica>>> GetNemocniceSUdajmi()
        {
            return Ok(await _dbContext.Nemocnicas.Include(a => a.IdmestaNavigation)
                .ToListAsync());
        }
    }
}