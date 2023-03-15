using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bakalarkaBE.Models;

public partial class Doktor
{
    public string Osobnecislo { get; set; } = null!;

    public string Meno { get; set; } = null!;

    public string Priezvisko { get; set; } = null!;

    public string? Kododdelenia { get; set; }

    public string? Idnemocnice { get; set; }

    public string Rola { get; set; } = null!;

    public string Heslo { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Alergiazdielanie> AlergiazdielanieCielovyNavigations { get; } = new List<Alergiazdielanie>();

    public virtual ICollection<Alergiazdielanie> AlergiazdielanieZdielajuciNavigations { get; } = new List<Alergiazdielanie>();

    public virtual ICollection<Historiadoktorov> Historiadoktorovs { get; } = new List<Historiadoktorov>();

    public virtual ICollection<Hospitalizaciezdielanie> HospitalizaciezdielanieCielovyNavigations { get; } = new List<Hospitalizaciezdielanie>();

    public virtual ICollection<Hospitalizaciezdielanie> HospitalizaciezdielanieZdielajuciNavigations { get; } = new List<Hospitalizaciezdielanie>();

    public virtual ICollection<Liekyzdielanie> LiekyzdielanieCielovyNavigations { get; } = new List<Liekyzdielanie>();

    public virtual ICollection<Liekyzdielanie> LiekyzdielanieZdielajuciNavigations { get; } = new List<Liekyzdielanie>();

    public virtual ICollection<Ochoreniazdielanie> OchoreniazdielanieCielovyNavigations { get; } = new List<Ochoreniazdielanie>();

    public virtual ICollection<Ochoreniazdielanie> OchoreniazdielanieZdielajuciNavigations { get; } = new List<Ochoreniazdielanie>();

    public virtual Oddelenie? Oddelenie { get; set; }
    [JsonIgnore]
    public virtual ICollection<Odporucacilistok> Odporucacilistoks { get; } = new List<Odporucacilistok>();
    [JsonIgnore]
    public virtual ICollection<PacientDoktor> PacientDoktors { get; } = new List<PacientDoktor>();

    public virtual ICollection<SpecializaciaDoktor> SpecializaciaDoktors { get; } = new List<SpecializaciaDoktor>();

    public virtual ICollection<Zaznam> Zaznams { get; } = new List<Zaznam>();

    public virtual ICollection<Zaznamyzdielanie> ZaznamyzdielanieCielovyNavigations { get; } = new List<Zaznamyzdielanie>();

    public virtual ICollection<Zaznamyzdielanie> ZaznamyzdielanieZdielajuciNavigations { get; } = new List<Zaznamyzdielanie>();
}
