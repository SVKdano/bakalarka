﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Zaznam
{
    public string Rodnecislo { get; set; } = null!;

    public string Osobnecislo { get; set; } = null!;

    public string? Dovodnavstevy { get; set; }

    public DateOnly Datum { get; set; }

    public TimeOnly Cas { get; set; }

    public string? Doplnujuceinformacie { get; set; }

    public string? Zaver { get; set; }

    public int Idzaznam { get; set; }

    public virtual Doktor OsobnecisloNavigation { get; set; } = null!;

    public virtual Pacient RodnecisloNavigation { get; set; } = null!;

    public virtual ICollection<VysetrenieZaznam> VysetrenieZaznams { get; } = new List<VysetrenieZaznam>();
    [JsonIgnore]
    public virtual ICollection<Zaznamyzdielanie> Zaznamyzdielanies { get; } = new List<Zaznamyzdielanie>();
}
