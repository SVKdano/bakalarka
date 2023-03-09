using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Historiapoistovni
{
    public int Id { get; set; }

    public DateOnly Datumod { get; set; }

    public DateOnly Datumdo { get; set; }

    public string Rodnecislo { get; set; } = null!;

    public int Idpoistovne { get; set; }

    public virtual Poistovna IdpoistovneNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
