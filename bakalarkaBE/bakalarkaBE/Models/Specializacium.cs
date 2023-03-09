using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Specializacium
{
    public string Kodspecializacie { get; set; } = null!;

    public string Nazovspecializacie { get; set; } = null!;

    public virtual ICollection<SpecializaciaDoktor> SpecializaciaDoktors { get; } = new List<SpecializaciaDoktor>();
}
