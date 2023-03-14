using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Specializacium
{
    public string Kodspecializacie { get; set; } = null!;

    public string Nazovspecializacie { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<SpecializaciaDoktor> SpecializaciaDoktors { get; } = new List<SpecializaciaDoktor>();
}
