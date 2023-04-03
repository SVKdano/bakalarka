using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Lieky
{
    public string Registracnecislo { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    public string? Doplnok { get; set; }

    public string Kodlieku { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Pacientovelieky> Pacientoveliekies { get; } = new List<Pacientovelieky>();
}
