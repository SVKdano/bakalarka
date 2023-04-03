using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Pacientoveochorenium
{
    public DateOnly Datumod { get; set; }

    public DateOnly? Datumdo { get; set; }

    public string Rodnecislo { get; set; } = null!;

    public string Kodochorenia { get; set; } = null!;

    public string? Dalsiaspecifikacia { get; set; }

    public virtual Ochorenium KodochoreniaNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Ochoreniazdielanie> Ochoreniazdielanies { get; } = new List<Ochoreniazdielanie>();

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;
}
