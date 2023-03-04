using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Pacient
{
    public string Rodnecislo { get; set; } = null!;

    public string Meno { get; set; } = null!;

    public string Priezvisko { get; set; } = null!;

    public DateOnly Datumnarodenia { get; set; }

    public string Psc { get; set; } = null!;

    public int Kodpoistovne { get; set; }
}
