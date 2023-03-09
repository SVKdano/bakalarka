using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Hospitalizaciezdielanie
{
    public string Rodnecislo { get; set; } = null!;

    public string Kododdelenia { get; set; } = null!;

    public string Idnemocnice { get; set; } = null!;

    public DateOnly Datumod { get; set; }

    public DateOnly DatumdoZdielanie { get; set; }

    public string Zdielajuci { get; set; } = null!;

    public string Cielovy { get; set; } = null!;

    public virtual Doktor CielovyNavigation { get; set; } = null!;

    public virtual Hospitalizacium Hospitalizacium { get; set; } = null!;

    public virtual Doktor ZdielajuciNavigation { get; set; } = null!;
}
