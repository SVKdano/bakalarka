using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Odporucacilistok
{
    public DateOnly Datumodporucenia { get; set; }

    public string Kododdelenia { get; set; } = null!;

    public string Idnemocnice { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public string Rodnecislo { get; set; } = null!;

    public virtual Oddelenie Oddelenie { get; set; } = null!;

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
