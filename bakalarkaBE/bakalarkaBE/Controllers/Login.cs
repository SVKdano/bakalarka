using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using bakalarkaBE.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;

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
        public async Task<ActionResult<List<Pacient>>> PostPrihlaseniePacientLogin(LoginDTO user)
        {
            var possibleUser = await 
                _dbContext.Pacients.FirstOrDefaultAsync(a => a.Rodnecislo == user.Cislo);

            if (possibleUser == null)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            if (Decrypt(possibleUser.Heslo) != user.heslo)
            {
                return BadRequest(new { Message = "Zlé rodné číslo alebo heslo" });
            }

            return Ok(possibleUser);
        }

        [HttpPost("/registraciaPacient")]
        public async Task<ActionResult<List<Pacient>>> PostRegistrujPacientaLogin(Pacient pacient)
        {
            if (_dbContext.Pacients.Any(a => a.Rodnecislo == pacient.Rodnecislo))
            {
                return BadRequest(new { Message = "Už ste registrovaný, pokračujte prosím na prihlásenie!" });
            }

            if (string.IsNullOrEmpty(pacient.Rodnecislo) || !Regex.IsMatch(pacient.Rodnecislo, "^\\d+$"))
            {
                return BadRequest(new { Message = "Zadajte validne rodné číslo!" });
            }

            if (string.IsNullOrEmpty(pacient.Meno) || !Regex.IsMatch(pacient.Meno, "[A-Za-zÀ-ȕ ]+$"))
            {
                return BadRequest(new { Message = "Zadaj valídne meno" });
            }
            
            if (string.IsNullOrEmpty(pacient.Priezvisko) || !Regex.IsMatch(pacient.Priezvisko, "[A-Za-zÀ-ȕ ]+$"))
            {
                return BadRequest(new { Message = "Zadaj valídne priezvisko" });
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
                Heslo = Encrypt(pacient.Heslo),
                Rola = "pacient",
                Email = pacient.Email
            };

            _dbContext.Pacients.Add(regPacient);
            await _dbContext.SaveChangesAsync();
            return Ok(regPacient);
        }
        
        [HttpPost("loginDoktor")]
        public async Task<ActionResult<List<Doktor>>> PostDoktorLogin(LoginDTO user)
        {
            var possibleUser = await 
                _dbContext.Doktors.FirstOrDefaultAsync(a => a.Osobnecislo == user.Cislo);

            if (possibleUser == null)
            {
                return BadRequest(new { Message = "Zlé osobné číslo alebo heslo" });
            }

            if (Decrypt(possibleUser.Heslo) != user.heslo)
            {
                return BadRequest(new { Message = "Zlé osobné číslo alebo heslo" });
            }

            return Ok(possibleUser);
        }

        [HttpPost("/loginNemocnica")]
        public async Task<ActionResult<List<Doktor>>> PostNemocincaLogin(LoginDTO user)
        {
            var possibleUser = await 
                _dbContext.Nemocnicas.FirstOrDefaultAsync(a => a.Idnemocnice == user.Cislo);
            
            if (possibleUser == null)
            {
                return BadRequest(new { Message = "Zlé identifikačné číslo alebo heslo" });
            }

            if (possibleUser.Heslo != user.heslo)
            {
                return BadRequest(new { Message = "Zlé identifikačné číslo alebo heslo" });
            }

            return Ok(possibleUser);
        }

        [HttpGet("/allPoistovne")]
        public async Task<ActionResult<List<Poistovna>>> GetPoistovneLogin()
        {
            return Ok(await _dbContext.Poistovnas.ToListAsync());
        }

        [HttpGet("/allMesta")]
        public async Task<ActionResult<List<Mestum>>> GetMestaLogin()
        {
            return Ok(await _dbContext.Mesta.ToListAsync());
        }

        [HttpPost("/resetHeslaPacient")]
        public async Task<ActionResult<Pacient>> PostResetHesloPacientLogin(LoginDTO login)
        {
            var possibleUser = await _dbContext.Pacients.FindAsync(login.Cislo);

            if (possibleUser == null || possibleUser.Email != login.heslo)
            {
                return BadRequest("Nesprávny email užívateľa");
            }
            
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var noveHeslo = new String(stringChars);
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("bakalarka.dokumentacia@gmail.com"));
            email.To.Add(MailboxAddress.Parse("bakalarka.ucet@gmail.com"));
            email.Subject = "Nove heslo";
            email.Body = new TextPart(TextFormat.Text) { Text = "Vaše nové heslo je: " + noveHeslo};

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("bakalarka.dokumentacia@gmail.com", "uwgsxxzabbyggwml");
            smtp.Send(email);
            smtp.Disconnect(true);

            possibleUser.Heslo = Encrypt(noveHeslo);
            
            await _dbContext.SaveChangesAsync();
            
            return Ok("Heslo " + possibleUser.Meno + " " + possibleUser.Priezvisko +" resetované!");
        }
        
        [HttpGet("/resetHeslaDoktor/{cislo}/{mail}")]
        public async Task<ActionResult<Pacient>> PostResetHesloDoktorLogin(string cislo, string mail)
        {
            var possibleUser = await _dbContext.Doktors.FindAsync(cislo);

            if (possibleUser == null || possibleUser.Email != mail)
            {
                return BadRequest("Nesprávny email užívateľa");
            }
            
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var noveHeslo = new String(stringChars);
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("bakalarka.dokumentacia@gmail.com"));
            email.To.Add(MailboxAddress.Parse("bakalarka.ucet@gmail.com"));
            email.Subject = "Nove heslo";
            email.Body = new TextPart(TextFormat.Text) { Text = "Vaše nové heslo je: " + noveHeslo};

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("bakalarka.dokumentacia@gmail.com", "uwgsxxzabbyggwml");
            smtp.Send(email);
            smtp.Disconnect(true);
            
            possibleUser.Heslo = Encrypt(noveHeslo);
            
            await _dbContext.SaveChangesAsync();
            
            return Ok(await _dbContext.Doktors.FindAsync(cislo));
        }
        
        [HttpGet("/resetHeslaNemocnica/{cislo}/{mail}")]
        public async Task<ActionResult<Pacient>> PostResetHesloNemocnicaLogin(string cislo, string mail)
        {
            var possibleUser = await _dbContext.Nemocnicas.FindAsync(cislo);

            if (possibleUser == null || possibleUser.Email != mail)
            {
                return BadRequest("Nesprávny email užívateľa");
            }
            
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var noveHeslo = new String(stringChars);
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("bakalarka.dokumentacia@gmail.com"));
            email.To.Add(MailboxAddress.Parse("bakalarka.ucet@gmail.com"));
            email.Subject = "Nove heslo";
            email.Body = new TextPart(TextFormat.Text) { Text = "Vaše nové heslo je: " + noveHeslo};

            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("bakalarka.dokumentacia@gmail.com", "uwgsxxzabbyggwml");
            smtp.Send(email);
            smtp.Disconnect(true);
            
            possibleUser.Heslo = Encrypt(noveHeslo);
            
            await _dbContext.SaveChangesAsync();
            
            return Ok("Heslo resetované!");
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
