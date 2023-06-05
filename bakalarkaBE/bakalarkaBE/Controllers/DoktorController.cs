using System.Security.Cryptography;
using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class DoktorController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public DoktorController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("doktor/{osobnecislo}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoroveUdajeDoktor(string osobnecislo)
        {
            var doktor = await _dbContext.Doktors
                .Include(a => a.SpecializaciaDoktors)
                .ThenInclude(b => b.KodspecializacieNavigation)
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Where(a => a.Osobnecislo == osobnecislo).ToListAsync();
            return Ok(doktor);
        }
        
        [HttpGet("doktoriOddelenia/{kododdelenia}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoriNaOddeleníDoktor(string kododdelenia)
        {
            var doktor = await _dbContext.Doktors
                .Include(a => a.Oddelenie)
                .Where(a => a.Oddelenie.Kododdelenia == kododdelenia).ToListAsync();
            return Ok(doktor);
        }

        [HttpGet("doktorPacienti/{osobnecislo}")]
        public async Task<ActionResult<List<PacientDoktor>>> GetDoktoroviPacientiDoktor(string osobnecislo)
        {
            /*var docPacienti = _dbContext.PacientDoktors.Join(_dbContext.Doktors, 
                a => a.Osobnecislo, b => b.Osobnecislo,
                (a,b) => new PacientDoktor()
                {
                    Osobnecislo = a.Osobnecislo,
                    Rodnecislo = a.Rodnecislo,
                    Datumod = a.Datumod,
                    OsobnecisloNavigation = b
                });
                */

            var docPacienti = await
                _dbContext.PacientDoktors
                    .Include(a => a.OsobnecisloNavigation)
                    .Include(a => a.RodnecisloNavigation)
                    .Where(a => a.Osobnecislo == osobnecislo).ToListAsync();

            return Ok(docPacienti);
        }

        [HttpGet("/allPacients")]
        public async Task<ActionResult<List<Pacient>>> GetPacientiDoktor()
        {
            return Ok(await _dbContext.Pacients.ToListAsync());
        }

        [HttpGet("/allAlergies")]
        public async Task<ActionResult<List<Alergie>>> GetAlergieDoktor()
        {
            return Ok(await _dbContext.Alergies.ToListAsync());
        }

        [HttpPost("/pridajPacienta")]
        public async Task<ActionResult<List<PacientDoktor>>> PostNovyPacientDoktor(PacientDoktor pacient)
        {
            pacient.Datumod = DateOnly.FromDateTime(DateTime.Now);
            _dbContext.Add(pacient);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        //--------------------ALERGIE-----------------------
        [HttpPost("/pridajAlergiu")]
        public async Task<ActionResult<List<PacientAlergie>>> PostPacientovuAlergiuDoktor(PacientAlergie alergia)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(alergia.Rodnecislo, alergia.Kodalergie);

            if (dbAlergia != null)
            {
                return BadRequest(new { Message = "Alergia už existuje! Upravte už existujúcu!" });
            }
            _dbContext.Add(alergia);
            await _dbContext.SaveChangesAsync();
            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }

        [HttpPut("/updateAlergiu")]
        public async Task<ActionResult<List<PacientAlergie>>> PutPacientovuAlergiuDoktor(PacientAlergie alergia)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(alergia.Rodnecislo, alergia.Kodalergie);

            if (dbAlergia == null)
            {
                return BadRequest(new { Message = "Alergia na aktualizaciu neexistuje" });
            }

            dbAlergia.Informacie = alergia.Informacie;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }

        [HttpDelete("/zmazAlergiu/{rodneCislo}/{kodAlergie}")]
        public async Task<ActionResult<List<PacientAlergie>>> DeletePacientovuAlergiuDoktor(string rodneCislo, string kodAlergie)
        {
            var dbAlergia = await _dbContext.PacientAlergies.FindAsync(rodneCislo, kodAlergie);

            if (dbAlergia == null)
            {
                return BadRequest(new { Message = "Alergia na zmazanie neexistuje" });
            }

            _dbContext.Remove(dbAlergia);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.PacientAlergies.ToListAsync());
        }
        
        //-----------------------LIEKY-------------------------
        [HttpGet("/allLieky")]
        public async Task<ActionResult<List<Lieky>>> GetLiekyDoktor()
        {
            return Ok(await _dbContext.Liekies.ToListAsync());
        }

        [HttpPost("/pridajLiek")]
        public async Task<ActionResult<List<Pacientovelieky>>> PostPacientovLiekDoktor(Pacientovelieky liek)
        {

            var dbLiek = await _dbContext.Pacientoveliekies.FindAsync(liek.Rodnecislo, liek.Datumod, liek.Registracnecislo);

            if (dbLiek != null)
            {
                return BadRequest(new { Message = "Liek už existuje! Upravte už existujúci!" });
            }

            _dbContext.Add(liek);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveliekies.ToListAsync());
        }

        [HttpPut("/ukonciUzivanie")]
        public async Task<ActionResult<List<Pacientovelieky>>> PutUzivnanieDoLiekuDoktor(Pacientovelieky liek)
        {
            var dbLiek = await _dbContext.Pacientoveliekies.FindAsync(liek.Rodnecislo, liek.Datumod, liek.Registracnecislo);

            if (dbLiek == null)
            {
                return BadRequest(new { Message = "Liek na zmenu neexistuje!" });
            }

            dbLiek.Davkovanie = liek.Davkovanie;
            dbLiek.Datumdo = liek.Datumdo;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveliekies.ToListAsync());
        }
        
        //--------------------OCHORENIA-----------------
        [HttpGet("/allOchorenia")]
        public async Task<ActionResult<List<Ochorenium>>> GetOchoreniaDoktor()
        {
            return Ok(await _dbContext.Ochorenia.ToListAsync());
        }

        [HttpPost("/pridajOchorenie")]
        public async Task<ActionResult<List<Pacientoveochorenium>>> PostPacientoveOchorenieDoktor(
            Pacientoveochorenium ochorenie)
        {
            var dbOchorenie = await _dbContext.Pacientoveochorenia
                .FindAsync(ochorenie.Datumod, ochorenie.Rodnecislo, ochorenie.Kodochorenia);

            if (dbOchorenie != null)
            {
                return BadRequest(new { Message = "Ochorenie už existuje! Upravte už existujúce!" });
            }

            _dbContext.Add(ochorenie);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Pacientoveochorenia.ToListAsync());
        }
        
        [HttpPut("/ukonciOchorenie")]
        public async Task<ActionResult<List<Pacientoveochorenium>>> PutOchorenieDoDoktor(Pacientoveochorenium ochorenie)
        {
            var dbOchorenie = await _dbContext.Pacientoveochorenia
                .FindAsync(ochorenie.Datumod, ochorenie.Rodnecislo, ochorenie.Kodochorenia);

            if (dbOchorenie == null)
            {
                return BadRequest(new { Message = "Ochorenie na zmenu neexistuje!" });
            }

            dbOchorenie.Dalsiaspecifikacia = ochorenie.Dalsiaspecifikacia;
            dbOchorenie.Datumdo = ochorenie.Datumdo;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Pacientoveochorenia.ToListAsync());
        }
        
        //--------------------ODPORUCACIE LISTKY------------------
        [HttpGet("/allOddelenia")]
        public async Task<ActionResult<List<Ochorenium>>> GetOddeleniaDoktor()
        {
            var retruned = await _dbContext.Oddelenies
                .Include(a => a.IdnemocniceNavigation).ToListAsync();
            return Ok(retruned);
        }
        
        [HttpGet("listky/{rodneCislo}/{osobneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> GetPacientoveListkyDoktor(string rodneCislo)
        {
            var lisok = await _dbContext.Odporucacilistoks
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Include(c => c.OsobnecisloNavigation)
                .Include(d => d.RodnecisloNavigation)
                .Where(a => a.Rodnecislo == rodneCislo).ToListAsync();
            return Ok(lisok);
        }

        [HttpPost("/pridajListok")]
        public async Task<ActionResult<List<Odporucacilistok>>> PostPacientovListokDoktor(Odporucacilistok listok)
        {
            var dbListok = await _dbContext.Odporucacilistoks
                .FindAsync(listok.Datumodporucenia, listok.Kododdelenia, listok.Idnemocnice,
                    listok.Osobnecislo, listok.Rodnecislo);

            if (dbListok != null)
            {
                return BadRequest(new { Message = "Listok na pridanie už existuje!" });
            }

            _dbContext.Add(listok);
            await _dbContext.SaveChangesAsync();
            
            return Ok(listok);
        }

        [HttpDelete("/vymazListok/{DatumOdporucenia}/{KodOddelenia}/{IdNemocnice}/{OsobneCislo}/{RodneCislo}")]
        public async Task<ActionResult<List<Odporucacilistok>>> 
            DeletePacientovListokDoktor(string DatumOdporucenia, string KodOddelenia, string IdNemocnice, string OsobneCislo, string RodneCislo)
        {
            var datum = DateOnly.Parse(DatumOdporucenia);
            var dbListok = await _dbContext.Odporucacilistoks
                .FindAsync(datum, KodOddelenia, IdNemocnice,
                    OsobneCislo, RodneCislo);

            if (dbListok == null)
            {
                return BadRequest(new { Message = "Lístok na odstanenie neexistuje" });
            }

            _dbContext.Remove(dbListok);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Odporucacilistoks.ToListAsync());
        }
        
        //---------------------ZAZNAM a VYSETRENIE--------------------------
        [HttpPost("/pridajZaznam")]
        public async Task<ActionResult<int>> PostPacientovZaznamDoktor(Zaznam zaznam)
        {
            _dbContext.Add(zaznam);
            await _dbContext.SaveChangesAsync();

            return Ok(zaznam.Idzaznam);
        }

        [HttpPut("/updateZaznam")]
        public async Task<ActionResult<List<Zaznam>>> PutPacientovZaznamDoktor(Zaznam zaznam)
        {
            var dbZaznam = await _dbContext.Zaznams.FindAsync(zaznam.Idzaznam);

            if (dbZaznam == null)
            {
                return BadRequest(new { Message = "Záznam na aktualizaciu neexistuje" });
            }

            dbZaznam.Dovodnavstevy = zaznam.Dovodnavstevy;
            dbZaznam.Doplnujuceinformacie = zaznam.Doplnujuceinformacie;
            dbZaznam.Zaver = zaznam.Zaver;
            
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Zaznams.ToListAsync());
        }

        [HttpGet("/getAllVysetria")]
        public async Task<ActionResult<List<Vysetrenie>>> GetVysetreniaDoktor()
        {
            return Ok(await _dbContext.Vysetrenies.ToListAsync());
        }

        [HttpPost("/pridajVysetrenieZaznamu")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> PostVysetrenieZaznamuDoktor(VysetrenieZaznam vysetrenie)
        {
            var dbVysetrenie = await _dbContext.VysetrenieZaznams
                .FindAsync(vysetrenie.Kod, vysetrenie.Idzaznam);

            if (dbVysetrenie != null)
            {
                return BadRequest(new { Message = "Vysetrenie v zázname už existuje!" });
            }

            _dbContext.Add(vysetrenie);
            await _dbContext.SaveChangesAsync();
            
            return Ok(vysetrenie);
        }

        [HttpDelete("/vymazVystrenie/{kod}/{idzaznam}")]
        public async Task<ActionResult<List<VysetrenieZaznam>>> DeleteVysetrenieZaznamuDoktor(string kod, int idzaznam)
        {
            var dbVysetrenieZaznam = await _dbContext.VysetrenieZaznams
                .FindAsync(kod, idzaznam);

            if (dbVysetrenieZaznam == null)
            {
                return BadRequest(new { Message = "Vysetrenie zo záznamu na odstanenie neexistuje" });
            }

            _dbContext.Remove(dbVysetrenieZaznam);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.VysetrenieZaznams.ToListAsync());
        }
        
        //------------------ALERGIE ZDIEALNIE--------------------
        [HttpGet("/mneZdielaneAlergie/{osobneCislo}")]
        public async Task<ActionResult<List<Alergiazdielanie>>> GetMneZdielaneAlergie(string osobneCislo)
        {
            var dbZdielaneAlergie = await _dbContext.Alergiazdielanies
                .Where(a => a.Cielovy == osobneCislo)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.KodalergieNavigation)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.ZdielajuciNavigation)
                .ToListAsync();
            return Ok(dbZdielaneAlergie);
        }


        [HttpGet("/mnouZdielaneAlergie/{osobneCislo}")]
        public async Task<ActionResult<List<Alergiazdielanie>>> GetMnouZdielaneAlergie(string osobneCislo)
        {
            var dbZdielaneAlergie = await _dbContext.Alergiazdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.KodalergieNavigation)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.CielovyNavigation)
                .ToListAsync();
            return Ok(dbZdielaneAlergie);
        }
        
        //----------------LIEKY ZDIELANIE---------------------
        [HttpGet("/mneZdielaneLieky/{osobneCislo}")]
        public async Task<ActionResult<List<Liekyzdielanie>>> GetMneZdielaneLieky(string osobneCislo)
        {
            var dbZdielaneLieky = await _dbContext.Liekyzdielanies
                .Where(a => a.Cielovy == osobneCislo)
                .Include(b => b.ZdielajuciNavigation)
                .Include(b => b.Pacientovelieky)
                .ThenInclude(c => c.RegistracnecisloNavigation)
                .Include(b => b.Pacientovelieky)
                .ThenInclude(c => c.RodnecisloNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneLieky);
        }
        
        [HttpGet("/mnouZdielaneLieky/{osobneCislo}")]
        public async Task<ActionResult<List<Liekyzdielanie>>> GetMnouZdielaneLieky(string osobneCislo)
        {
            var dbZdielaneLieky = await _dbContext.Liekyzdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.CielovyNavigation)
                .Include(b => b.Pacientovelieky)
                .ThenInclude(c => c.RegistracnecisloNavigation)
                .Include(b => b.Pacientovelieky)
                .ThenInclude(c => c.RodnecisloNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneLieky);
        }
        
        //------------------OCHORENIA ZDIELANIE-------------
        [HttpGet("/mneZdielaneOchorenia/{osobneCislo}")]
        public async Task<ActionResult<List<Ochoreniazdielanie>>> GetMneZdielaneOchorenia(string osobneCislo)
        {
            var dbZdielaneOchorenia = await _dbContext.Ochoreniazdielanies
                .Where(a => a.Cielovy == osobneCislo)
                .Include(b => b.Pacientoveochorenium)
                .ThenInclude(c => c.KodochoreniaNavigation).
                Include(b => b.Pacientoveochorenium)
                .ThenInclude(c =>c.RodnecisloNavigation)
                .Include(b => b.ZdielajuciNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneOchorenia);
        }
        
        [HttpGet("/mnouZdielaneOchorenia/{osobneCislo}")]
        public async Task<ActionResult<List<Ochoreniazdielanie>>> GetMnouZdielaneOchorenia(string osobneCislo)
        {
            var dbZdielaneOchorenia = await _dbContext.Ochoreniazdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.Pacientoveochorenium)
                .ThenInclude(c => c.KodochoreniaNavigation).
                Include(b => b.Pacientoveochorenium)
                .ThenInclude(c =>c.RodnecisloNavigation)
                .Include(b => b.CielovyNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneOchorenia);
        }
        
        //------------ZAZNAMY ZDIELANIE---------------
        [HttpGet("/mneZdielaneZaznamy/{osobneCislo}")]
        public async Task<ActionResult<List<Ochoreniazdielanie>>> GetMneZdielaneZaznamy(string osobneCislo)
        {
            var dbZdielaneZaznamy = await _dbContext.Zaznamyzdielanies
                .Where(a => a.Cielovy == osobneCislo)
                .Include(b => b.IdzaznamuNavigation)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.ZdielajuciNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneZaznamy);
        }
        
        [HttpGet("/mnouZdielaneZaznamy/{osobneCislo}")]
        public async Task<ActionResult<List<Ochoreniazdielanie>>> GetMnouZdielaneZaznamy(string osobneCislo)
        {
            var dbZdielaneZaznamy = await _dbContext.Zaznamyzdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.IdzaznamuNavigation)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.CielovyNavigation)
                .ToListAsync();
            
            return Ok(dbZdielaneZaznamy);
        }
        
        //------------GRAF DATA---------------
        [HttpGet("/graphData/{osobneCislo}")]
        public async Task<ActionResult<List<GraphDatas>>> GetDataForGraph(string osobneCislo)
        {
            string tentoMesiac = DateOnly.FromDateTime(DateTime.Now).ToString("MM/dd/yyyy").Substring(0,2);
            string tentoRok = DateOnly.FromDateTime(DateTime.Now).ToString("MM/dd/yyyy").Substring(6);
            int mesiac = Int32.Parse(tentoMesiac);
            int rok = Int32.Parse(tentoRok);
            List<GraphDatas> data = new List<GraphDatas>();

            for (int i = 0; i < 5; i++)
            {
                if (mesiac - 1 == 0)
                {
                    mesiac = 12;
                    rok--;
                }
                else
                {
                    mesiac = mesiac - 1;
                }

                GraphDatas datas = new GraphDatas
                {
                    Mesiac = mesiac,
                    Pocet = _dbContext.Zaznams
                        .Where(a => a.Datum.Month == mesiac && a.Datum.Year == rok && a.Osobnecislo == osobneCislo)
                        .Count()
                };
                
                data.Add(datas);
                //data.Add(_dbContext.Zaznams.Where(a => a.Datum.Month == mesiac && a.Datum.Year == rok).Count());
            }
            
            return Ok(data);
        }

        [HttpPost("pacientiCsv/{osobneCislo}")]
        public async Task<ActionResult>
            DownloadCsvPacientiDoktora(string osobneCislo, FilterDTO filterDto)
        {
            var docPacienti = await
                _dbContext.PacientDoktors
                    .Include(a => a.OsobnecisloNavigation)
                    .Include(a => a.RodnecisloNavigation)
                    .Where(a => a.Osobnecislo == osobneCislo 
                                && a.RodnecisloNavigation.Meno.ToLower().Contains(filterDto.menoFilter.ToLower())
                                && a.RodnecisloNavigation.Priezvisko.ToLower().Contains(filterDto.priezviskoFilter.ToLower())
                                && a.RodnecisloNavigation.Rodnecislo.Contains(filterDto.rodnecisloFilter))
                    .ToListAsync();
            
            var csvContent = "OsobneCislo;MenoDoktora;PriezviskoDoktora;RodneCislo;MenoPacienta;PriezviskoPacienta;\n";

            foreach (var pacient in docPacienti)
            {
                csvContent += pacient.Osobnecislo + ";";
                csvContent += pacient.OsobnecisloNavigation.Meno + ";";
                csvContent += pacient.OsobnecisloNavigation.Priezvisko + ";";
                csvContent += pacient.Rodnecislo + ";";
                csvContent += pacient.RodnecisloNavigation.Meno + ";";
                csvContent += pacient.RodnecisloNavigation.Priezvisko + ";\n";
            }
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
            
        }
        
        [HttpPost("pacientiJson/{osobneCislo}")]
        public async Task<ActionResult>
            DownloadJsonPacientiDoktora(string osobneCislo, FilterDTO filterDTO)
        {
            var docPacienti = await
                _dbContext.PacientDoktors
                    .Include(a => a.OsobnecisloNavigation)
                    .Include(a => a.RodnecisloNavigation)
                    .Where(a => a.Osobnecislo == osobneCislo 
                                && a.RodnecisloNavigation.Meno.ToLower().Contains(filterDTO.menoFilter.ToLower())
                                && a.RodnecisloNavigation.Priezvisko.ToLower().Contains(filterDTO.priezviskoFilter.ToLower())
                                && a.RodnecisloNavigation.Rodnecislo.Contains(filterDTO.rodnecisloFilter))
                    .ToListAsync();
            
            
            return Ok(docPacienti);
            
        }
        
        [HttpPost("zazdielaneAlergieCsv/{osobneCislo}")]
        public async Task<ActionResult>
            DownloadCsvZazdielaneAlergie(string osobneCislo, FilterDTO filterDTO)
        {
            var dbZdielaneAlergie = await _dbContext.Alergiazdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.KodalergieNavigation)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.CielovyNavigation)
                .Where(a => a.PacientAlergie.RodnecisloNavigation.Meno.ToLower().Contains(filterDTO.menoFilter.ToLower())
                            && a.PacientAlergie.RodnecisloNavigation.Priezvisko.ToLower().Contains(filterDTO.priezviskoFilter.ToLower())
                            && a.PacientAlergie.RodnecisloNavigation.Rodnecislo.Contains(filterDTO.rodnecisloFilter))
                .ToListAsync();
            
            var csvContent = "OsobneCisloZdielajuceho;OsobneCisloCieloveho;MenoCieloveho;" +
                             "PriezviskoCieloveho;RodneCislo;MenoPacienta;PriezviskoPacienta;" +
                             "KodAlergie;Alergia;DoplnujuceInformacie;\n";

            foreach (var alergia in dbZdielaneAlergie)
            {
                csvContent += alergia.Zdielajuci + ";";
                csvContent += alergia.Cielovy + ";";
                csvContent += alergia.CielovyNavigation.Meno + ";";
                csvContent += alergia.CielovyNavigation.Priezvisko + ";";
                csvContent += alergia.Rodnecislo + ";";
                csvContent += alergia.PacientAlergie.RodnecisloNavigation.Meno + ";";
                csvContent += alergia.PacientAlergie.RodnecisloNavigation.Priezvisko + ";";
                csvContent += alergia.PacientAlergie.Kodalergie + ";";
                csvContent += alergia.PacientAlergie.KodalergieNavigation.Nazov + ";";
                csvContent += alergia.PacientAlergie.Informacie + ";\n";
            }
            var fileBytes = Encoding.UTF8.GetBytes(csvContent);

            return File(fileBytes, "text/csv", "example.csv");
        }
        
        [HttpPost("zazdielaneAlergieJson/{osobneCislo}")]
        public async Task<ActionResult>
            DownloadJsonZazdielaneAlergie(string osobneCislo, FilterDTO filterDTO)
        {
            var dbZdielaneAlergie = await _dbContext.Alergiazdielanies
                .Where(a => a.Zdielajuci == osobneCislo)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.KodalergieNavigation)
                .Include(b => b.PacientAlergie)
                .ThenInclude(c => c.RodnecisloNavigation)
                .Include(b => b.CielovyNavigation)
                .Where(a => a.PacientAlergie.RodnecisloNavigation.Meno.ToLower().Contains(filterDTO.menoFilter.ToLower())
                            && a.PacientAlergie.RodnecisloNavigation.Priezvisko.ToLower().Contains(filterDTO.priezviskoFilter.ToLower())
                            && a.PacientAlergie.RodnecisloNavigation.Rodnecislo.Contains(filterDTO.rodnecisloFilter))
                .ToListAsync();
            
            return Ok(dbZdielaneAlergie);
        }
        
        [HttpGet("Hash")]
        public string EncryptToken(string? token)
        {
            string _publicKey = "IdkwtdwtIdkwtdwt";
            string? _privateKey = Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.Process) ??
                          Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.User);
            
            var crypted = "";

            byte[] secretKeyByte = { };
            secretKeyByte = System.Text.Encoding.UTF8.GetBytes(_privateKey!);
            byte[] publicKeyByte = { };
            publicKeyByte = System.Text.Encoding.UTF8.GetBytes(_publicKey!);

            byte[] inputByteArray = System.Text.Encoding.UTF8.GetBytes(token!);

            MemoryStream? ms = null;
            CryptoStream? cs = null;

            using (Aes des = Aes.Create())
            {
                ms = new MemoryStream();
                cs = new CryptoStream(ms, des.CreateEncryptor(secretKeyByte, publicKeyByte), CryptoStreamMode.Write);

                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();
                crypted = Convert.ToBase64String(ms.ToArray());
            }

            return crypted;
        }
        
        [HttpGet("Decrpipt")]
        public string DecryptToken(string? token)
        {
            string _publicKey = "IdkwtdwtIdkwtdwt";
            string? _privateKey = Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.Process) ??
                                  Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.User);
            
            if (token == null)
                return "";

            var decrypted = "";

            byte[] secretKeyByte = { };
            secretKeyByte = System.Text.Encoding.UTF8.GetBytes(_privateKey!);
            byte[] publicKeyByte = { };
            publicKeyByte = System.Text.Encoding.UTF8.GetBytes(_publicKey!);

            MemoryStream? ms = null;
            CryptoStream? cs = null;

            byte[] inputByteArray = new byte[token.Replace(" ", "+").Length];
            inputByteArray = Convert.FromBase64String(token.Replace(" ", "+"));

            using (Aes des = Aes.Create())
            {
                ms = new MemoryStream();
                cs = new CryptoStream(ms, des.CreateDecryptor(secretKeyByte, publicKeyByte), CryptoStreamMode.Write);

                cs.Write(inputByteArray, 0, inputByteArray.Length);
                cs.FlushFinalBlock();

                Encoding encoding = Encoding.UTF8;
                decrypted = encoding.GetString(ms.ToArray());
            }

            return decrypted;
        }
    }
}