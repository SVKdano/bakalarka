using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Ochorenium
{
    public string Kodochorenia { get; set; } = null!;

    public string Nazov { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Pacientoveochorenium> Pacientoveochorenia { get; } = new List<Pacientoveochorenium>();
}
