using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Alergie
{
    public string Kodalergie { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<PacientAlergie> PacientAlergies { get; } = new List<PacientAlergie>();
}
