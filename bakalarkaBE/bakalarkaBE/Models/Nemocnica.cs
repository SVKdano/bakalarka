﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Nemocnica
{
    public string Idnemocnice { get; set; } = null!;

    public string Nazov { get; set; } = null!;

    public string Ulica { get; set; } = null!;

    public int Idmesta { get; set; }

    public string Rola { get; set; } = null!;

    public string Heslo { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual Mestum IdmestaNavigation { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Oddelenie> Oddelenies { get; } = new List<Oddelenie>();
}
