using System.Text;
using System.Text.Json;
using System.IO;
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
        public async Task<ActionResult<List<Pacient>>> GetOsobneUdajePacientaPacient(string rodneCislo)
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
                    Email = a.Email,
                    IdpoistovneNavigation = b,
                    IdmestaNavigation = a.IdmestaNavigation
                }).Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacient);
        }

        [HttpGet("alergie/{rodneCislo}")]
        public async Task<ActionResult<List<PacientAlergie>>> GetPacientoveAlergiePacient(string rodneCislo)
        {
            var pacAlergie = await _dbContext.PacientAlergies.Join(_dbContext.Alergies,
                    a => a.Kodalergie, b => b.Kodalergie,
                    (a, b) => new PacientAlergie()
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
        public async Task<ActionResult<List<Pacientoveochorenium>>> GetPacientoveOchoreniaPacient(string rodneCislo)
        {
            var pacOchorenia = await _dbContext.Pacientoveochorenia.Join(_dbContext.Ochorenia,
                    a => a.Kodochorenia, b => b.Kodochorenia,
                    (a, b) => new Pacientoveochorenium()
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
        public async Task<ActionResult<List<Pacientovelieky>>> GetPacientoveLiekyPacient(string rodneCislo)
        {
            /*var pacLieky = await _dbContext.Pacientoveliekies.Join(_dbContext.Liekies, 
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
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();*/

            var pacLieky = await _dbContext.Pacientoveliekies
                .Include(a => a.RegistracnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo)
                .ToListAsync();

            return Ok(pacLieky);
        }

        [HttpGet("doktori/{rodneCislo}")]
        public async Task<ActionResult<List<PacientDoktor>>> GetPacientoviDoktoriPacient(string rodneCislo)
        {
            var pacDoktori = await _dbContext.PacientDoktors.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a, b) => new PacientDoktor()
                    {
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Datumod = a.Datumod,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacDoktori);
        }

        [HttpGet("vysetreniaVZazname/{idZaznamu}")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> GetVysetreniaZaznamuPacient(int idZaznamu)
        {
            var pacZaznamy = await _dbContext.VysetrenieZaznams.Join(_dbContext.Vysetrenies,
                    a => a.Kod, b => b.Kod,
                    (a, b) => new VysetrenieZaznam()
                    {
                        Kod = a.Kod,
                        Idzaznam = a.Idzaznam,
                        Datum = a.Datum,
                        Vysledokvysetrenia = a.Vysledokvysetrenia,
                        IdzaznamNavigation = a.IdzaznamNavigation,
                        KodNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznamu).ToListAsync();

            return Ok(pacZaznamy);
        }

        [HttpGet("zaznamy/{rodneCislo}")]
        public async Task<ActionResult<List<Zaznam>>> GetPacientoveZaznamyPacient(string rodneCislo)
        {
            var pacZaznamy = await _dbContext.Zaznams.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a, b) => new Zaznam()
                    {
                        Idzaznam = a.Idzaznam,
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Dovodnavstevy = a.Dovodnavstevy,
                        Datum = a.Datum,
                        Cas = a.Cas,
                        Doplnujuceinformacie = a.Doplnujuceinformacie,
                        Zaver = a.Zaver,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacZaznamy);
        }

        [HttpGet("zaznam/{idZaznam}")]
        public async Task<ActionResult<List<Zaznam>>> GetPacientovZaznamPacient(int idZaznam)
        {
            var pacZaznamy = await _dbContext.Zaznams.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a, b) => new Zaznam()
                    {
                        Idzaznam = a.Idzaznam,
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Dovodnavstevy = a.Dovodnavstevy,
                        Datum = a.Datum,
                        Cas = a.Cas,
                        Doplnujuceinformacie = a.Doplnujuceinformacie,
                        Zaver = a.Zaver,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznam).ToListAsync();

            return Ok(pacZaznamy);
        }

        [HttpGet("listky/{rodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> GetPacientoveListkyPacient(string rodneCislo)
        {
            var pacLisky = await _dbContext.Odporucacilistoks.Join(_dbContext.Oddelenies,
                    a => new { a.Kododdelenia, a.Idnemocnice }, b => new { b.Kododdelenia, b.Idnemocnice },
                    (a, b) => new Odporucacilistok()
                    {
                        Datumodporucenia = a.Datumodporucenia,
                        Kododdelenia = a.Kododdelenia,
                        Idnemocnice = a.Idnemocnice,
                        Osobnecislo = a.Osobnecislo,
                        Rodnecislo = a.Rodnecislo,
                        Oddelenie = b
                    }).Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a, b) => new Odporucacilistok()
                    {
                        Datumodporucenia = a.Datumodporucenia,
                        Kododdelenia = a.Kododdelenia,
                        Idnemocnice = a.Idnemocnice,
                        Osobnecislo = a.Osobnecislo,
                        Rodnecislo = a.Rodnecislo,
                        Oddelenie = a.Oddelenie,
                        OsobnecisloNavigation = b
                    }).Join(_dbContext.Pacients,
                    a => a.Rodnecislo, b => b.Rodnecislo,
                    (a, b) => new Odporucacilistok()
                    {
                        Datumodporucenia = a.Datumodporucenia,
                        Kododdelenia = a.Kododdelenia,
                        Idnemocnice = a.Idnemocnice,
                        Osobnecislo = a.Osobnecislo,
                        Rodnecislo = a.Rodnecislo,
                        Oddelenie = a.Oddelenie,
                        OsobnecisloNavigation = a.OsobnecisloNavigation,
                        RodnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            return Ok(pacLisky);
        }

        [HttpGet("listkyv2/{rodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> GetPacientoveOdporucacieLiskyPacient(string rodneCislo)
        {
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();
            return Ok(lisok);
        }

        [HttpPut("zmenaUdajov")]
        public async Task<ActionResult<List<Pacient>>> PutZmenaUdajovPacient(Pacient pacient)
        {
            var dbPacient = await _dbContext.Pacients.FindAsync(pacient.Rodnecislo);

            if (dbPacient == null)
            {
                return BadRequest(new { Message = "Pacient neexistuje!" });
            }

            if (dbPacient.Heslo != pacient.Heslo)
            {
                return BadRequest(new { Message = "Pôvodné heslo nie je rovnaké!" });
            }

            dbPacient.Meno = pacient.Meno;
            dbPacient.Priezvisko = pacient.Priezvisko;
            dbPacient.Ulica = pacient.Ulica;
            dbPacient.Idmesta = pacient.Idmesta;
            dbPacient.Heslo = pacient.Heslo;
            dbPacient.Email = pacient.Email;

            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacients.ToListAsync());
        }

        [HttpPut("zmenaHesla")]
        public async Task<ActionResult<List<Pacient>>> PutZmenaHeslaPacient(HesloUpdate hesloUpdate)
        {
            var dbPacient = await _dbContext.Pacients.FindAsync(hesloUpdate.rodnecislo);

            if (dbPacient == null)
            {
                return BadRequest(new { Message = "Pacient neexistuje!" });
            }

            if (hesloUpdate.stareheslo != dbPacient.Heslo)
            {
                return BadRequest(new { Message = "Pôvodné heslo nie je rovnaké!" });
            }

            dbPacient.Heslo = hesloUpdate.noveheslo;

            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacients.ToListAsync());
        }

        [HttpGet("csvDownloadAlergie/{rodneCislo}")]
        public async Task<ActionResult> DownloadCSVAlergie(string rodneCislo)
        {
            var pacAlergie = await _dbContext.PacientAlergies.Join(_dbContext.Alergies,
                    a => a.Kodalergie, b => b.Kodalergie,
                    (a, b) => new PacientAlergie()
                    {
                        Rodnecislo = a.Rodnecislo,
                        Kodalergie = a.Kodalergie,
                        Informacie = a.Informacie,
                        KodalergieNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();

            string csvContent = "";
            
            foreach (var alergia in pacAlergie)
            {
                
                csvContent += alergia.Rodnecislo + ";";
                csvContent += alergia.Kodalergie + ";";
                csvContent += alergia.KodalergieNavigation.Nazov + ";";
                csvContent += alergia.Informacie + ";\n";
            }
            
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }

        [HttpGet("ochoreniaCSV/{rodneCislo}/{datumod}/{datumdo}/{datumodneukoncene}")]
        public async Task<ActionResult> 
            DownloadCsvOchorenia(string rodneCislo, string datumod, string datumdo, string datumodneukoncene)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            DateOnly datumOdNeukoncene = DateOnly.ParseExact(datumodneukoncene, "yyyy-MM-dd");
            
            var pacOchoreniaUkoncene = await _dbContext.Pacientoveochorenia
                .Include(a => a.KodochoreniaNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo != null 
                                                       && a.Datumod >= datumOd && a.Datumdo <= datumDo)
                .ToListAsync();
            
            var pacOchoreniaNeukoncene = await _dbContext.Pacientoveochorenia
                .Include(a => a.KodochoreniaNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo == null 
                                                       && a.Datumod >= datumOdNeukoncene)
                .ToListAsync();
            
            string csvContent = "RodneCislo;DatumOd;DatumDo;KodOchorenia;NazovOchorenia;DalisaSpecifikacia;\n";

            foreach (var ukoncene in pacOchoreniaUkoncene)
            {
                csvContent += ukoncene.Rodnecislo += ";";
                csvContent += ukoncene.Datumod;
                csvContent += ";";
                csvContent += ukoncene.Datumdo;
                csvContent += ";";
                csvContent += ukoncene.Kodochorenia += ";";
                csvContent += ukoncene.KodochoreniaNavigation.Nazov += ";";
                csvContent += ukoncene.Dalsiaspecifikacia += ";\n";
            }
            
            foreach (var neukoncene in pacOchoreniaNeukoncene)
            {
                csvContent += neukoncene.Rodnecislo += ";";
                csvContent += neukoncene.Datumod;
                csvContent += ";";
                csvContent += neukoncene.Datumdo;
                csvContent += ";";
                csvContent += neukoncene.Kodochorenia += ";";
                csvContent += neukoncene.KodochoreniaNavigation.Nazov += ";";
                csvContent += neukoncene.Dalsiaspecifikacia += ";\n";
            }

            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }
        
        [HttpGet("ochoreniaJson/{rodneCislo}/{datumod}/{datumdo}/{datumodneukoncene}")]
        public async Task<ActionResult> 
            DownloadJsonOchorenia(string rodneCislo, string datumod, string datumdo, string datumodneukoncene)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            DateOnly datumOdNeukoncene = DateOnly.ParseExact(datumodneukoncene, "yyyy-MM-dd");
            
            var pacOchoreniaUkoncene = await _dbContext.Pacientoveochorenia
                .Include(a => a.KodochoreniaNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo != null 
                                                       && a.Datumod >= datumOd && a.Datumdo <= datumDo)
                .ToListAsync();
            
            var pacOchoreniaNeukoncene = await _dbContext.Pacientoveochorenia
                .Include(a => a.KodochoreniaNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo == null 
                                                       && a.Datumod >= datumOdNeukoncene)
                .ToListAsync();

            var combined = pacOchoreniaUkoncene.Concat(pacOchoreniaNeukoncene).ToList();

            return Ok(combined);
        }

        [HttpGet("liekyCSV/{rodneCislo}/{datumod}/{datumdo}/{datumodneukoncene}")]
        public async Task<ActionResult>
            DownloadCsvLieky(string rodneCislo, string datumod, string datumdo, string datumodneukoncene)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            DateOnly datumOdNeukoncene = DateOnly.ParseExact(datumodneukoncene, "yyyy-MM-dd");  
            
            var pacLiekyUkoncene = await _dbContext.Pacientoveliekies
                .Include(a => a.RegistracnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo != null 
                                                       && a.Datumod >= datumOd && a.Datumdo <= datumDo)
                .ToListAsync();
            
            var pacLiekyNeukoncene = await _dbContext.Pacientoveliekies
                .Include(a => a.RegistracnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo == null 
                    && a.Datumod >= datumOdNeukoncene)
                .ToListAsync();
            
            
            string csvContent = "RodneCislo;DatumOd;DatumDo;RegistracneCislo;Nazov;Doplnok;Davkovanie;\n";

            foreach (var liek in pacLiekyUkoncene)
            {
                csvContent += liek.Rodnecislo + ";";
                csvContent += liek.Datumod;
                csvContent += ";";
                csvContent += liek.Datumdo;
                csvContent += ";";
                csvContent += liek.Registracnecislo + ";";
                csvContent += liek.RegistracnecisloNavigation.Nazov + ";";
                csvContent += liek.RegistracnecisloNavigation.Doplnok + ";";
                csvContent += liek.Davkovanie + ";\n";
            }
            
            foreach (var liek in pacLiekyNeukoncene)
            {
                csvContent += liek.Rodnecislo + ";";
                csvContent += liek.Datumod;
                csvContent += ";";
                csvContent += liek.Datumdo;
                csvContent += ";";
                csvContent += liek.Registracnecislo + ";";
                csvContent += liek.RegistracnecisloNavigation.Nazov + ";";
                csvContent += liek.RegistracnecisloNavigation.Doplnok + ";";
                csvContent += liek.Davkovanie + ";\n";
            }
            
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }

        [HttpGet("liekyJson/{rodneCislo}/{datumod}/{datumdo}/{datumodneukoncene}")]
        public async Task<ActionResult>
            DownloadJsonLieky(string rodneCislo, string datumod, string datumdo, string datumodneukoncene)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            DateOnly datumOdNeukoncene = DateOnly.ParseExact(datumodneukoncene, "yyyy-MM-dd");

            var pacLiekyUkoncene = await _dbContext.Pacientoveliekies
                .Include(a => a.RegistracnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo != null
                                                       && a.Datumod >= datumOd && a.Datumdo <= datumDo)
                .ToListAsync();

            var pacLiekyNeukoncene = await _dbContext.Pacientoveliekies
                .Include(a => a.RegistracnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumdo == null
                                                       && a.Datumod >= datumOdNeukoncene)
                .ToListAsync();
            
            var combined = pacLiekyUkoncene.Concat(pacLiekyNeukoncene).ToList();

            return Ok(combined);
        }

        [HttpGet("listkyCsv/{rodneCislo}/{datumod}/{datumdo}")]
        public async Task<ActionResult>
            DownloadCsvListky(string rodneCislo, string datumod, string datumdo)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumodporucenia >= datumOd && a.Datumodporucenia <= datumDo)
                .ToListAsync();
            
            string csvContent = "RodneCislo;OsobneCislo;DatumOdporucenia;KodOddelenia;NazovOddelenia;IdNemocnice;Nazov;\n";

            foreach (var list in lisok)
            {
                csvContent += list.Rodnecislo + ";";
                csvContent += list.Osobnecislo + ";";
                csvContent += list.Datumodporucenia;
                csvContent += ";";
                csvContent += list.Kododdelenia + ";";
                csvContent += list.Oddelenie.Nazovoddelenia + ";";
                csvContent += list.Oddelenie.Idnemocnice + ";";
                csvContent += list.Oddelenie.IdnemocniceNavigation.Nazov + ";\n";
            }
            
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }
        
        [HttpGet("listkyJson/{rodneCislo}/{datumod}/{datumdo}")]
        public async Task<ActionResult>
            DownloadJsonListky(string rodneCislo, string datumod, string datumdo)
        {
            DateOnly datumOd = DateOnly.ParseExact(datumod, "yyyy-MM-dd");
            DateOnly datumDo = DateOnly.ParseExact(datumdo, "yyyy-MM-dd");
            
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo && a.Datumodporucenia >= datumOd && a.Datumodporucenia <= datumDo)
                .ToListAsync();

            return Ok(lisok);
        }
        
        [HttpGet("doktoriCsv/{rodneCislo}")]
        public async Task<ActionResult> DownloadCsvDoktori(string rodneCislo)
        {
            var pacDoktori = await _dbContext.PacientDoktors.Join(_dbContext.Doktors,
                    a => a.Osobnecislo, b => b.Osobnecislo,
                    (a, b) => new PacientDoktor()
                    {
                        Rodnecislo = a.Rodnecislo,
                        Osobnecislo = a.Osobnecislo,
                        Datumod = a.Datumod,
                        OsobnecisloNavigation = b
                    })
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();
            
            string csvContent = "RodneCislo;OsobneCislo;MenoDoktora;PriezviskoDoktora;\n";

            foreach (var doktor in pacDoktori)
            {
                csvContent += doktor.Rodnecislo + ";";
                csvContent += doktor.Osobnecislo + ";";
                csvContent += doktor.OsobnecisloNavigation.Meno + ";";
                csvContent += doktor.OsobnecisloNavigation.Priezvisko + ";\n";
            }
            
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }

        [HttpGet("zaznamCsv/{idZaznamu}")]
        public async Task<ActionResult> DownloadCsvZaznam(int idZaznamu)
        {
            var zaznam = await _dbContext.Zaznams
                .Include(a => a .OsobnecisloNavigation)
                .Where(a => a.Idzaznam == idZaznamu)
                .ToListAsync();
            
            var vysetreniaZaznamu = await _dbContext.VysetrenieZaznams.Join(_dbContext.Vysetrenies,
                    a => a.Kod, b => b.Kod,
                    (a, b) => new VysetrenieZaznam()
                    {
                        Kod = a.Kod,
                        Idzaznam = a.Idzaznam,
                        Datum = a.Datum,
                        Vysledokvysetrenia = a.Vysledokvysetrenia,
                        IdzaznamNavigation = a.IdzaznamNavigation,
                        KodNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznamu).ToListAsync();

            var csvContent = "IdZaznamu;RodneCislo;DovodNavstevy;OsobneCislo;Meno;Priezvisko;Datum;Cas;DodatocneInformacie;Zaver;\n";

            var prvy = vysetreniaZaznamu.First();
            var zaznamSolo = zaznam.First();
            
            csvContent += prvy.IdzaznamNavigation.Idzaznam + ";";
            csvContent += prvy.IdzaznamNavigation.Rodnecislo + ";";
            csvContent += prvy.IdzaznamNavigation.Dovodnavstevy + ";";
            csvContent += prvy.IdzaznamNavigation.Osobnecislo + ";";
            csvContent += zaznamSolo.OsobnecisloNavigation.Meno + ";";
            csvContent += zaznamSolo.OsobnecisloNavigation.Priezvisko + ";";
            csvContent += prvy.IdzaznamNavigation.Datum;
            csvContent += ";";
            csvContent += prvy.IdzaznamNavigation.Cas;
            csvContent += ";";
            csvContent += prvy.IdzaznamNavigation.Doplnujuceinformacie + ";";
            csvContent += prvy.IdzaznamNavigation.Zaver + ";\n";

            csvContent += "KodVystrenia;NazovVystrenia;Datum;VysledokVystrenia;\n";

            foreach (var vysetrenie in vysetreniaZaznamu)
            {
                csvContent += vysetrenie.Kod + ";";
                csvContent += vysetrenie.KodNavigation.Nazov + ";";
                csvContent += vysetrenie.Datum;
                csvContent += ";";
                csvContent += vysetrenie.Vysledokvysetrenia + ";\n";
            }

            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }

        [HttpGet("zaznamJson/{idZaznamu}")]
        public async Task<ActionResult> DownloadJsonZaznam(int idZaznamu)
        {
            var zaznam = await _dbContext.Zaznams
                .Include(a => a .OsobnecisloNavigation)
                .Where(a => a.Idzaznam == idZaznamu)
                .ToListAsync();
            
            var pacZaznam = await _dbContext.VysetrenieZaznams.Join(_dbContext.Vysetrenies,
                    a => a.Kod, b => b.Kod,
                    (a, b) => new VysetrenieZaznam()
                    {
                        Kod = a.Kod,
                        Idzaznam = a.Idzaznam,
                        Datum = a.Datum,
                        Vysledokvysetrenia = a.Vysledokvysetrenia,
                        KodNavigation = b
                    })
                .Where(a => a.Idzaznam == idZaznamu).ToListAsync();

            var combined = new { zaznam = zaznam, vysetrenia = pacZaznam };

            return Ok(combined);
        }
    }
}