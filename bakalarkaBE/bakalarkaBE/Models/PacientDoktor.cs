using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class PacientDoktor
{
    public string Rodnecislo { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public DateOnly Datumod { get; set; }

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
