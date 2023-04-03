using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Ochoreniazdielanie
{
    public string Zdielajuci { get; set; } = null!;

    public string Cielovy { get; set; } = null!;

    public string Rodnecislo { get; set; } = null!;

    public string Kodochorenia { get; set; } = null!;

    public DateOnly Datumod { get; set; }

    public DateOnly DatumdoZdielanie { get; set; }

    public virtual Doktor CielovyNavigation { get; set; } = null!;
    
    public virtual Pacientoveochorenium Pacientoveochorenium { get; set; } = null!;

    public virtual Doktor ZdielajuciNavigation { get; set; } = null!;
}
