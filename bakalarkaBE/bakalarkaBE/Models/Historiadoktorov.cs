using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Historiadoktorov
{
    public DateOnly Datumod { get; set; }

    public string? Datumdo { get; set; }

    public string Rodnecislo { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
