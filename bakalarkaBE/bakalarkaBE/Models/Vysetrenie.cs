using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Vysetrenie
{
    public string Kod { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    public virtual ICollection<VysetrenieZaznam> VysetrenieZaznams { get; } = new List<VysetrenieZaznam>();
}
