using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Hospitalizacium
{
    public DateOnly Datumod { get; set; }

    public string Rodnecislo { get; set; } = null!;

    public string Kododdelenia { get; set; } = null!;

    public string Idnemocnice { get; set; } = null!;

    public DateOnly? Datumdo { get; set; }

    public virtual ICollection<Hospitalizaciezdielanie> Hospitalizaciezdielanies { get; } = new List<Hospitalizaciezdielanie>();

    public virtual Oddelenie Oddelenie { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
