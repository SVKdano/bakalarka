using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Pacient
{
    public string Rodnecislo { get; set; } = null!;

    public string Meno { get; set; } = null!;

    public string Priezvisko { get; set; } = null!;

    public string? Ulica { get; set; }

    public int? Idpoistovne { get; set; }

    public DateOnly? Poistenyvpoistovniod { get; set; }

    public DateOnly? Umrtie { get; set; }

    public int? Idmesta { get; set; }

    public string Heslo { get; set; } = null!;

    public string Rola { get; set; } = null!;

    public virtual ICollection<Historiadoktorov> Historiadoktorovs { get; } = new List<Historiadoktorov>();

    public virtual ICollection<Historiapoistovni> Historiapoistovnis { get; } = new List<Historiapoistovni>();

    public virtual ICollection<Hospitalizacium> Hospitalizacia { get; } = new List<Hospitalizacium>();

    public virtual Mestum? IdmestaNavigation { get; set; }

    public virtual Poistovna? IdpoistovneNavigation { get; set; }

    public virtual ICollection<Odporucacilistok> Odporucacilistoks { get; } = new List<Odporucacilistok>();

    public virtual ICollection<PacientAlergie> PacientAlergies { get; } = new List<PacientAlergie>();

    public virtual ICollection<Pacientovelieky> Pacientoveliekies { get; } = new List<Pacientovelieky>();

    public virtual ICollection<Pacientoveochorenium> Pacientoveochorenia { get; } = new List<Pacientoveochorenium>();

    public virtual ICollection<Zaznam> Zaznams { get; } = new List<Zaznam>();

    public virtual ICollection<Doktor> Osobnecislos { get; } = new List<Doktor>();
}
