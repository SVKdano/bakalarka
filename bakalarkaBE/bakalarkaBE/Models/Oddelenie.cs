using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Oddelenie
{
    public string Kododdelenia { get; set; } = null!;

    public int Kapacita { get; set; }

    public string Idnemocnice { get; set; } = null!;

    public string Nazovoddelenia { get; set; } = null!;

    public virtual ICollection<Doktor> Doktors { get; } = new List<Doktor>();

    public virtual ICollection<Hospitalizacium> Hospitalizacia { get; } = new List<Hospitalizacium>();

    public virtual Nemocnica IdnemocniceNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Odporucacilistok> Odporucacilistoks { get; } = new List<Odporucacilistok>();
}
