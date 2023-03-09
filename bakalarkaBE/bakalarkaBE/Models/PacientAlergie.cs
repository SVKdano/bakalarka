using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class PacientAlergie
{
    public string Rodnecislo { get; set; } = null!;

    public string Kodalergie { get; set; } = null!;

    public string? Informacie { get; set; }

    public virtual ICollection<Alergiazdielanie> Alergiazdielanies { get; } = new List<Alergiazdielanie>();

    public virtual Alergie KodalergieNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
