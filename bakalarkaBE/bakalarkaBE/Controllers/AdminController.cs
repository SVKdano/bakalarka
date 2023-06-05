using System.Security.Cryptography;
using System.Text;
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

            nemocnica.Heslo = Encrypt(nemocnica.Heslo);
            
            _dbContext.Add(nemocnica);
            await _dbContext.SaveChangesAsync();

            return Ok(await _dbContext.Nemocnicas.ToListAsync());
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