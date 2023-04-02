using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class ZdielanieController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public ZdielanieController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("/newController")]
        public async Task<ActionResult<List<Alergie>>> TestController()
        {
            var alergie = await _dbContext.PacientAlergies.Where(a => a.Rodnecislo == "0003015078").ToArrayAsync();

            List<string> kodyAlergii = new List<string>();
            
            for (int i = 0; i < alergie.Length; i++)
            {
                kodyAlergii.Add(alergie[i].Kodalergie);
            }

            foreach (var VARIABLE in kodyAlergii)
            {
                Console.WriteLine(VARIABLE);
            }
            
            return Ok(kodyAlergii);
        }
    }
}