using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Pacientovelieky
{
    public string Rodnecislo { get; set; } = null!;

    public DateOnly Datumod { get; set; }

    public string? Datumdo { get; set; }

    public string Davkovanie { get; set; } = null!;

    public string Registracnecislo { get; set; } = null!;

    public virtual ICollection<Liekyzdielanie> Liekyzdielanies { get; } = new List<Liekyzdielanie>();

    public virtual Lieky RegistracnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
