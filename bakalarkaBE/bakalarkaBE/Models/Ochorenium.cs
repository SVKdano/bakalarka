using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Ochorenium
{
    public string Kodochorenia { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    public virtual ICollection<Pacientoveochorenium> Pacientoveochorenia { get; } = new List<Pacientoveochorenium>();
}
