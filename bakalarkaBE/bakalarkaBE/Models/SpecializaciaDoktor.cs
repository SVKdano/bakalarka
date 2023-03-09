using System;
using System.Collections.Generic;

namespace bakalarkaBE.Models;

public partial class SpecializaciaDoktor
{
    public string Kodspecializacie { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public DateOnly Datumnadobudnutia { get; set; }

    public virtual Specializacium KodspecializacieNavigation { get; set; } = null!;

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;
}
