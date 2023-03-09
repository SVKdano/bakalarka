using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Zaznam
{
    public string Rodnecislo { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public string? Dovodnavstevy { get; set; }

    public DateOnly Datum { get; set; }

    public TimeOnly Cas { get; set; }

    public string? Vykonanevysetrenia { get; set; }

    public string? Vysledokvysetrenia { get; set; }

    public string? Doplnujuceinformacie { get; set; }

    public string? Zaver { get; set; }

    public int Idzaznam { get; set; }

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;

    public virtual ICollection<Zaznamyzdielanie> Zaznamyzdielanies { get; } = new List<Zaznamyzdielanie>();

    public virtual ICollection<Vysetrenie> Kods { get; } = new List<Vysetrenie>();
}
