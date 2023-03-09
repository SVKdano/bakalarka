using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Alergie
{
    public string Kodalergie { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    public virtual ICollection<PacientAlergie> PacientAlergies { get; } = new List<PacientAlergie>();
}
