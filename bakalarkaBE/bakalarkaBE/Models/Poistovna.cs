using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Poistovna
{
    public int Idpoistovne { get; set; }

    public string Nazov { get; set; } = null!;

    public virtual ICollection<Historiapoistovni> Historiapoistovnis { get; } = new List<Historiapoistovni>();

    public virtual ICollection<Pacient> Pacients { get; } = new List<Pacient>();
}
