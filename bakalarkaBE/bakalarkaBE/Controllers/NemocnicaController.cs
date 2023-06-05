using System.Security.Cryptography;
using System.Text;
using bakalarkaBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;

namespace bakalarkaBE.Controllers
{
    [ApiController]
    public class NemocnicaController : ControllerBase
    {
        private readonly DatabazaBcContext _dbContext;

        public NemocnicaController(DatabazaBcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("udajeNemocnice/{idNemocnice}")]
        public async Task<ActionResult<List<Nemocnica>>> GetUdajeONemocniciNemocnica(string idNemocnice)
        {
            return Ok(await _dbContext.Nemocnicas
                .Include(a => a.IdmestaNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }

        [HttpGet("doktoriVNemocnici/{idNemocnice}")]
        public async Task<ActionResult<List<Doktor>>> GetDoktoriVNemocniciNemocnica(string idNemocnice)
        {
            return Ok(await _dbContext.Doktors
                .Include(a => a.SpecializaciaDoktors)
                .Include(a => a.Oddelenie)
                .ThenInclude(b => b.IdnemocniceNavigation)
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync());
        }

        [HttpPost("pridajDoktora")]
        public async Task<ActionResult<List<Doktor>>> PostPridajDoktoraNemocica(Doktor doktor)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var noveHeslo = new String(stringChars);
            doktor.Heslo = Encrypt(noveHeslo);
            doktor.Rola = "doktor";

            var possibleDuplicity = await _dbContext.Doktors.FindAsync(doktor.Osobnecislo);

            if (possibleDuplicity != null)
            {
                return BadRequest(new { Message = "Doktor s týmto osobným číslom už existuje" });
            }

            _dbContext.Add(doktor);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Doktors.ToListAsync());
        }

        [HttpGet("oddeleniaNemocnice/{idNemocnice}")]
        public async Task<ActionResult<List<Doktor>>> GetOddeleniaNemocniceNemocnica(string idNemocnice)
        {
            var oddelenia = await _dbContext.Oddelenies
                .Where(a => a.Idnemocnice == idNemocnice)
                .ToListAsync();
            
            return Ok(oddelenia);
        }

        [HttpPost("pridajOddelenie")]
        public async Task<ActionResult<List<Doktor>>> PostPridajOddelenieNemocica(Oddelenie oddelenie)
        {
            var dbOddelenie = await _dbContext.Oddelenies.FindAsync(oddelenie.Kododdelenia, oddelenie.Idnemocnice);

            if (dbOddelenie != null)
            {
                return BadRequest(new { Message = "Oddelenie na pridanie už existuje!" });
            }

            _dbContext.Add(oddelenie);
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Oddelenies.ToListAsync());
        }

        [HttpPut("zmenOddelenieDoktora")]
        public async Task<ActionResult<List<Doktor>>> PutZmenOddelenieDoktoraNemocnica(Doktor doktor)
        {
            return Ok(await _dbContext.Doktors.ToListAsync());
        }
        
        private string Encrypt(string? toEncrypt)
        {
            string _publicKey = "IdkwtdwtIdkwtdwt";
            string? _privateKey = Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.Process) ??
                          Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.User);
            
            var crypted = "";

            byte[] secretKeyByte = { };
            secretKeyByte = System.Text.Encoding.UTF8.GetBytes(_privateKey!);
            byte[] publicKeyByte = { };
            publicKeyByte = System.Text.Encoding.UTF8.GetBytes(_publicKey!);

            byte[] inputByteArray = System.Text.Encoding.UTF8.GetBytes(toEncrypt!);

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
        
        
        private string Decrypt(string? toDecrypt)
        {
            string _publicKey = "IdkwtdwtIdkwtdwt";
            string? _privateKey = Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.Process) ??
                                  Environment.GetEnvironmentVariable("PrivateKey", EnvironmentVariableTarget.User);
            
            if (toDecrypt == null)
                return "";

            var decrypted = "";

            byte[] secretKeyByte = { };
            secretKeyByte = System.Text.Encoding.UTF8.GetBytes(_privateKey!);
            byte[] publicKeyByte = { };
            publicKeyByte = System.Text.Encoding.UTF8.GetBytes(_publicKey!);

            MemoryStream? ms = null;
            CryptoStream? cs = null;

            byte[] inputByteArray = new byte[toDecrypt.Replace(" ", "+").Length];
            inputByteArray = Convert.FromBase64String(toDecrypt.Replace(" ", "+"));

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