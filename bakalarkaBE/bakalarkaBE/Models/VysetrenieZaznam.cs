using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class VysetrenieZaznam
{
    public string Kod { get; set; } = null!;

    public int Idzaznam { get; set; }

    public DateOnly? Datum { get; set; }

    public virtual Zaznam IdzaznamNavigation { get; set; } = null!;

    public virtual Vysetrenie KodNavigation { get; set; } = null!;
}
