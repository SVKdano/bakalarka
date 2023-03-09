﻿using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class Liekyzdielanie
{
    public string Zdielajuci { get; set; } = null!;

    public string Cielovy { get; set; } = null!;

    public string Registracnecislo { get; set; } = null!;

    public string Rodnecislo { get; set; } = null!;

    public DateOnly Datumod { get; set; }

    public DateOnly DatumdoZdielanie { get; set; }

    public virtual Doktor CielovyNavigation { get; set; } = null!;

    public virtual Pacientovelieky Pacientovelieky { get; set; } = null!;

    public virtual Doktor ZdielajuciNavigation { get; set; } = null!;
}
