using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Zaznamyzdielanie
{
    public string Zdielajuci { get; set; } = null!;

    public string Cielovy { get; set; } = null!;

    public int Idzaznamu { get; set; }

    public DateOnly DatumdoZdielanie { get; set; }

    public virtual Doktor CielovyNavigation { get; set; } = null!;

    public virtual Zaznam IdzaznamuNavigation { get; set; } = null!;

    public virtual Doktor ZdielajuciNavigation { get; set; } = null!;
}
