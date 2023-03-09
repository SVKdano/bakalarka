using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Alergiazdielanie
{
    public string Zdielajuci { get; set; } = null!;

    public string Cielovy { get; set; } = null!;

    public string Rodnecislo { get; set; } = null!;

    public string Kodalergie { get; set; } = null!;

    public DateOnly Datumdo { get; set; }

    public virtual Doktor CielovyNavigation { get; set; } = null!;

    public virtual PacientAlergie PacientAlergie { get; set; } = null!;

    public virtual Doktor ZdielajuciNavigation { get; set; } = null!;
}
