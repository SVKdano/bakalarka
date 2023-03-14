using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Mestum
{
    public int Idmesta { get; set; }

    public string Psc { get; set; } = null!;

    public string Nazov { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Nemocnica> Nemocnicas { get; } = new List<Nemocnica>();

    public virtual ICollection<Pacient> Pacients { get; } = new List<Pacient>();
}
