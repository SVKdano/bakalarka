using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Models;

public partial class DatabazaBcContext : DbContext
{
    public DatabazaBcContext()
    {
    }

    public DatabazaBcContext(DbContextOptions<DatabazaBcContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alergiazdielanie> Alergiazdielanies { get; set; }

    public virtual DbSet<Alergie> Alergies { get; set; }

    public virtual DbSet<Doktor> Doktors { get; set; }

    public virtual DbSet<Historiadoktorov> Historiadoktorovs { get; set; }

    public virtual DbSet<Historiapoistovni> Historiapoistovnis { get; set; }

    public virtual DbSet<Hospitalizaciezdielanie> Hospitalizaciezdielanies { get; set; }

    public virtual DbSet<Hospitalizacium> Hospitalizacia { get; set; }

    public virtual DbSet<Lieky> Liekies { get; set; }

    public virtual DbSet<Liekyzdielanie> Liekyzdielanies { get; set; }

    public virtual DbSet<Mestum> Mesta { get; set; }

    public virtual DbSet<Nemocnica> Nemocnicas { get; set; }

    public virtual DbSet<Ochoreniazdielanie> Ochoreniazdielanies { get; set; }

    public virtual DbSet<Ochorenium> Ochorenia { get; set; }

    public virtual DbSet<Oddelenie> Oddelenies { get; set; }

    public virtual DbSet<Odporucacilistok> Odporucacilistoks { get; set; }

    public virtual DbSet<Pacient> Pacients { get; set; }

    public virtual DbSet<PacientAlergie> PacientAlergies { get; set; }

    public virtual DbSet<Pacientovelieky> Pacientoveliekies { get; set; }

    public virtual DbSet<Pacientoveochorenium> Pacientoveochorenia { get; set; }

    public virtual DbSet<Poistovna> Poistovnas { get; set; }

    public virtual DbSet<SpecializaciaDoktor> SpecializaciaDoktors { get; set; }

    public virtual DbSet<Specializacium> Specializacia { get; set; }

    public virtual DbSet<Vysetrenie> Vysetrenies { get; set; }

    public virtual DbSet<Zaznam> Zaznams { get; set; }

    public virtual DbSet<Zaznamyzdielanie> Zaznamyzdielanies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=databazaBC;Username=daniellieskovsky;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alergiazdielanie>(entity =>
        {
            entity.HasKey(e => new { e.Zdielajuci, e.Cielovy, e.Rodnecislo, e.Kodalergie }).HasName("alergiazdielanie_pk");

            entity.ToTable("alergiazdielanie", "bakalarka");

            entity.Property(e => e.Zdielajuci)
                .HasMaxLength(7)
                .HasColumnName("zdielajuci");
            entity.Property(e => e.Cielovy)
                .HasMaxLength(7)
                .HasColumnName("cielovy");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Kodalergie)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("kodalergie");
            entity.Property(e => e.Datumdo).HasColumnName("datumdo");

            entity.HasOne(d => d.CielovyNavigation).WithMany(p => p.AlergiazdielanieCielovyNavigations)
                .HasForeignKey(d => d.Cielovy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("alergiazdielanie_fk_1");

            entity.HasOne(d => d.ZdielajuciNavigation).WithMany(p => p.AlergiazdielanieZdielajuciNavigations)
                .HasForeignKey(d => d.Zdielajuci)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("alergiazdielanie_fk");

            entity.HasOne(d => d.PacientAlergie).WithMany(p => p.Alergiazdielanies)
                .HasForeignKey(d => new { d.Rodnecislo, d.Kodalergie })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("alergiazdielanie_fk_2");
        });

        modelBuilder.Entity<Alergie>(entity =>
        {
            entity.HasKey(e => e.Kodalergie).HasName("xpkalergie");

            entity.ToTable("alergie", "bakalarka");

            entity.Property(e => e.Kodalergie)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("kodalergie");
            entity.Property(e => e.Nazov)
                .HasMaxLength(30)
                .HasColumnName("nazov");
        });

        modelBuilder.Entity<Doktor>(entity =>
        {
            entity.HasKey(e => e.Osobnecislo).HasName("xpkdoktor");

            entity.ToTable("doktor", "bakalarka");

            entity.Property(e => e.Osobnecislo)
                .HasMaxLength(7)
                .HasColumnName("osobnecislo");
            entity.Property(e => e.Heslo)
                .HasColumnType("character varying")
                .HasColumnName("heslo");
            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Kododdelenia)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kododdelenia");
            entity.Property(e => e.Meno)
                .HasMaxLength(20)
                .HasColumnName("meno");
            entity.Property(e => e.Priezvisko)
                .HasMaxLength(80)
                .HasColumnName("priezvisko");
            entity.Property(e => e.Rola)
                .HasColumnType("character varying")
                .HasColumnName("rola");

            entity.HasOne(d => d.Oddelenie).WithMany(p => p.Doktors)
                .HasForeignKey(d => new { d.Kododdelenia, d.Idnemocnice })
                .HasConstraintName("doktor_fk");
        });

        modelBuilder.Entity<Historiadoktorov>(entity =>
        {
            entity.HasKey(e => new { e.Datumod, e.Rodnecislo, e.Osobnecislo }).HasName("xpkhistoriadoktorov");

            entity.ToTable("historiadoktorov", "bakalarka");

            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Osobnecislo)
                .HasMaxLength(10)
                .HasColumnName("osobnecislo");
            entity.Property(e => e.Datumdo)
                .HasMaxLength(18)
                .IsFixedLength()
                .HasColumnName("datumdo");

            entity.HasOne(d => d.OsobnecisloNavigation).WithMany(p => p.Historiadoktorovs)
                .HasForeignKey(d => d.Osobnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_22");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Historiadoktorovs)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_21");
        });

        modelBuilder.Entity<Historiapoistovni>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.Datumod, e.Datumdo, e.Rodnecislo, e.Idpoistovne }).HasName("historiapoistovni_pk");

            entity.ToTable("historiapoistovni", "bakalarka");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Datumdo).HasColumnName("datumdo");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Idpoistovne).HasColumnName("idpoistovne");

            entity.HasOne(d => d.IdpoistovneNavigation).WithMany(p => p.Historiapoistovnis)
                .HasForeignKey(d => d.Idpoistovne)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("historiapoistovni_fk_1");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Historiapoistovnis)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("historiapoistovni_fk");
        });

        modelBuilder.Entity<Hospitalizaciezdielanie>(entity =>
        {
            entity.HasKey(e => new { e.Rodnecislo, e.Idnemocnice, e.Kododdelenia, e.Datumod, e.Zdielajuci, e.Cielovy }).HasName("hospitalizaciezdielanie_pk");

            entity.ToTable("hospitalizaciezdielanie", "bakalarka");

            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Kododdelenia)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kododdelenia");
            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Zdielajuci)
                .HasMaxLength(7)
                .HasColumnName("zdielajuci");
            entity.Property(e => e.Cielovy)
                .HasMaxLength(7)
                .HasColumnName("cielovy");
            entity.Property(e => e.DatumdoZdielanie).HasColumnName("datumdo_zdielanie");

            entity.HasOne(d => d.CielovyNavigation).WithMany(p => p.HospitalizaciezdielanieCielovyNavigations)
                .HasForeignKey(d => d.Cielovy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("hospitalizaciezdielanie_fk_2");

            entity.HasOne(d => d.ZdielajuciNavigation).WithMany(p => p.HospitalizaciezdielanieZdielajuciNavigations)
                .HasForeignKey(d => d.Zdielajuci)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("hospitalizaciezdielanie_fk_1");

            entity.HasOne(d => d.Hospitalizacium).WithMany(p => p.Hospitalizaciezdielanies)
                .HasForeignKey(d => new { d.Datumod, d.Rodnecislo, d.Kododdelenia, d.Idnemocnice })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("hospitalizaciezdielanie_fk");
        });

        modelBuilder.Entity<Hospitalizacium>(entity =>
        {
            entity.HasKey(e => new { e.Datumod, e.Rodnecislo, e.Kododdelenia, e.Idnemocnice }).HasName("xpkhospitalizacia");

            entity.ToTable("hospitalizacia", "bakalarka");

            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Kododdelenia)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kododdelenia");
            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Datumdo).HasColumnName("datumdo");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Hospitalizacia)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_13");

            entity.HasOne(d => d.Oddelenie).WithMany(p => p.Hospitalizacia)
                .HasForeignKey(d => new { d.Kododdelenia, d.Idnemocnice })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_14");
        });

        modelBuilder.Entity<Lieky>(entity =>
        {
            entity.HasKey(e => e.Registracnecislo).HasName("lieky_pk");

            entity.ToTable("lieky", "bakalarka");

            entity.Property(e => e.Registracnecislo)
                .HasColumnType("character varying")
                .HasColumnName("registracnecislo");
            entity.Property(e => e.Doplnok).HasColumnName("doplnok");
            entity.Property(e => e.Kodlieku)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kodlieku");
            entity.Property(e => e.Nazov).HasColumnName("nazov");
        });

        modelBuilder.Entity<Liekyzdielanie>(entity =>
        {
            entity.HasKey(e => new { e.Zdielajuci, e.Cielovy, e.Registracnecislo, e.Rodnecislo, e.Datumod }).HasName("liekyzdielanie_pk");

            entity.ToTable("liekyzdielanie", "bakalarka");

            entity.Property(e => e.Zdielajuci)
                .HasMaxLength(7)
                .HasColumnName("zdielajuci");
            entity.Property(e => e.Cielovy)
                .HasMaxLength(7)
                .HasColumnName("cielovy");
            entity.Property(e => e.Registracnecislo)
                .HasColumnType("character varying")
                .HasColumnName("registracnecislo");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.DatumdoZdielanie).HasColumnName("datumdo_zdielanie");

            entity.HasOne(d => d.CielovyNavigation).WithMany(p => p.LiekyzdielanieCielovyNavigations)
                .HasForeignKey(d => d.Cielovy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("liekyzdielanie_fk_2");

            entity.HasOne(d => d.ZdielajuciNavigation).WithMany(p => p.LiekyzdielanieZdielajuciNavigations)
                .HasForeignKey(d => d.Zdielajuci)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("liekyzdielanie_fk_1");

            entity.HasOne(d => d.Pacientovelieky).WithMany(p => p.Liekyzdielanies)
                .HasForeignKey(d => new { d.Rodnecislo, d.Datumod, d.Registracnecislo })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("liekyzdielanie_fk");
        });

        modelBuilder.Entity<Mestum>(entity =>
        {
            entity.HasKey(e => e.Idmesta).HasName("mesta_pk");

            entity.ToTable("mesta", "bakalarka");

            entity.Property(e => e.Idmesta)
                .HasDefaultValueSql("nextval('bakalarka.mesta_id_seq'::regclass)")
                .HasColumnName("idmesta");
            entity.Property(e => e.Nazov)
                .HasColumnType("character varying")
                .HasColumnName("nazov");
            entity.Property(e => e.Psc)
                .HasMaxLength(6)
                .IsFixedLength()
                .HasColumnName("psc");
        });

        modelBuilder.Entity<Nemocnica>(entity =>
        {
            entity.HasKey(e => e.Idnemocnice).HasName("xpknemocnica");

            entity.ToTable("nemocnica", "bakalarka");

            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Heslo)
                .HasColumnType("character varying")
                .HasColumnName("heslo");
            entity.Property(e => e.Idmesta).HasColumnName("idmesta");
            entity.Property(e => e.Nazov)
                .HasMaxLength(120)
                .HasColumnName("nazov");
            entity.Property(e => e.Rola)
                .HasMaxLength(10)
                .HasColumnName("rola");
            entity.Property(e => e.Ulica)
                .HasMaxLength(50)
                .HasColumnName("ulica");

            entity.HasOne(d => d.IdmestaNavigation).WithMany(p => p.Nemocnicas)
                .HasForeignKey(d => d.Idmesta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("nemocnica_fk");
        });

        modelBuilder.Entity<Ochoreniazdielanie>(entity =>
        {
            entity.HasKey(e => new { e.Zdielajuci, e.Cielovy, e.Rodnecislo, e.Kodochorenia, e.Datumod }).HasName("ochoreniazdielanie_pk");

            entity.ToTable("ochoreniazdielanie", "bakalarka");

            entity.Property(e => e.Zdielajuci)
                .HasMaxLength(7)
                .HasColumnName("zdielajuci");
            entity.Property(e => e.Cielovy)
                .HasMaxLength(7)
                .HasColumnName("cielovy");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Kodochorenia)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("kodochorenia");
            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.DatumdoZdielanie).HasColumnName("datumdo_zdielanie");

            entity.HasOne(d => d.CielovyNavigation).WithMany(p => p.OchoreniazdielanieCielovyNavigations)
                .HasForeignKey(d => d.Cielovy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ochoreniazdielanie_fk_1");

            entity.HasOne(d => d.ZdielajuciNavigation).WithMany(p => p.OchoreniazdielanieZdielajuciNavigations)
                .HasForeignKey(d => d.Zdielajuci)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ochoreniazdielanie_fk");

            entity.HasOne(d => d.Pacientoveochorenium).WithMany(p => p.Ochoreniazdielanies)
                .HasForeignKey(d => new { d.Datumod, d.Rodnecislo, d.Kodochorenia })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ochoreniazdielanie_fk_2");
        });

        modelBuilder.Entity<Ochorenium>(entity =>
        {
            entity.HasKey(e => e.Kodochorenia).HasName("xpkochorenia");

            entity.ToTable("ochorenia", "bakalarka");

            entity.Property(e => e.Kodochorenia)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("kodochorenia");
            entity.Property(e => e.Nazov)
                .HasMaxLength(40)
                .HasColumnName("nazov");
        });

        modelBuilder.Entity<Oddelenie>(entity =>
        {
            entity.HasKey(e => new { e.Kododdelenia, e.Idnemocnice }).HasName("xpkoddelenie");

            entity.ToTable("oddelenie", "bakalarka");

            entity.Property(e => e.Kododdelenia)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kododdelenia");
            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Kapacita).HasColumnName("kapacita");
            entity.Property(e => e.Nazovoddelenia)
                .HasMaxLength(50)
                .HasColumnName("nazovoddelenia");

            entity.HasOne(d => d.IdnemocniceNavigation).WithMany(p => p.Oddelenies)
                .HasForeignKey(d => d.Idnemocnice)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_12");
        });

        modelBuilder.Entity<Odporucacilistok>(entity =>
        {
            entity.HasKey(e => new { e.Datumodporucenia, e.Kododdelenia, e.Idnemocnice, e.Osobnecislo, e.Rodnecislo }).HasName("xpkodporucacilistok");

            entity.ToTable("odporucacilistok", "bakalarka");

            entity.Property(e => e.Datumodporucenia).HasColumnName("datumodporucenia");
            entity.Property(e => e.Kododdelenia)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("kododdelenia");
            entity.Property(e => e.Idnemocnice)
                .HasMaxLength(7)
                .HasColumnName("idnemocnice");
            entity.Property(e => e.Osobnecislo)
                .HasMaxLength(10)
                .HasColumnName("osobnecislo");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");

            entity.HasOne(d => d.OsobnecisloNavigation).WithMany(p => p.Odporucacilistoks)
                .HasForeignKey(d => d.Osobnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_24");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Odporucacilistoks)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_25");

            entity.HasOne(d => d.Oddelenie).WithMany(p => p.Odporucacilistoks)
                .HasForeignKey(d => new { d.Kododdelenia, d.Idnemocnice })
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_23");
        });

        modelBuilder.Entity<Pacient>(entity =>
        {
            entity.HasKey(e => e.Rodnecislo).HasName("xpkpacient");

            entity.ToTable("pacient", "bakalarka");

            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Heslo)
                .HasColumnType("character varying")
                .HasColumnName("heslo");
            entity.Property(e => e.Idmesta).HasColumnName("idmesta");
            entity.Property(e => e.Idpoistovne).HasColumnName("idpoistovne");
            entity.Property(e => e.Meno)
                .HasMaxLength(20)
                .HasColumnName("meno");
            entity.Property(e => e.Poistenyvpoistovniod).HasColumnName("poistenyvpoistovniod");
            entity.Property(e => e.Priezvisko)
                .HasMaxLength(40)
                .HasColumnName("priezvisko");
            entity.Property(e => e.Rola)
                .HasColumnType("character varying")
                .HasColumnName("rola");
            entity.Property(e => e.Ulica)
                .HasMaxLength(40)
                .HasColumnName("ulica");
            entity.Property(e => e.Umrtie).HasColumnName("umrtie");

            entity.HasOne(d => d.IdmestaNavigation).WithMany(p => p.Pacients)
                .HasForeignKey(d => d.Idmesta)
                .HasConstraintName("pacient_fk");

            entity.HasOne(d => d.IdpoistovneNavigation).WithMany(p => p.Pacients)
                .HasForeignKey(d => d.Idpoistovne)
                .HasConstraintName("r_3");

            entity.HasMany(d => d.Osobnecislos).WithMany(p => p.Rodnecislos)
                .UsingEntity<Dictionary<string, object>>(
                    "PacientDoktor",
                    r => r.HasOne<Doktor>().WithMany()
                        .HasForeignKey("Osobnecislo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("r_20"),
                    l => l.HasOne<Pacient>().WithMany()
                        .HasForeignKey("Rodnecislo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("r_19"),
                    j =>
                    {
                        j.HasKey("Rodnecislo", "Osobnecislo").HasName("xpkpacient_doktor");
                        j.ToTable("pacient_doktor", "bakalarka");
                    });
        });

        modelBuilder.Entity<PacientAlergie>(entity =>
        {
            entity.HasKey(e => new { e.Rodnecislo, e.Kodalergie }).HasName("xpkpacient_alergie");

            entity.ToTable("pacient_alergie", "bakalarka");

            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Kodalergie)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("kodalergie");
            entity.Property(e => e.Informacie)
                .HasMaxLength(70)
                .HasColumnName("informacie");

            entity.HasOne(d => d.KodalergieNavigation).WithMany(p => p.PacientAlergies)
                .HasForeignKey(d => d.Kodalergie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_9");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.PacientAlergies)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_8");
        });

        modelBuilder.Entity<Pacientovelieky>(entity =>
        {
            entity.HasKey(e => new { e.Rodnecislo, e.Datumod, e.Registracnecislo }).HasName("pacientovelieky_pk");

            entity.ToTable("pacientovelieky", "bakalarka");

            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Registracnecislo)
                .HasColumnType("character varying")
                .HasColumnName("registracnecislo");
            entity.Property(e => e.Datumdo)
                .HasMaxLength(18)
                .IsFixedLength()
                .HasColumnName("datumdo");
            entity.Property(e => e.Davkovanie).HasColumnName("davkovanie");

            entity.HasOne(d => d.RegistracnecisloNavigation).WithMany(p => p.Pacientoveliekies)
                .HasForeignKey(d => d.Registracnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pacientovelieky_fk");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Pacientoveliekies)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_11");
        });

        modelBuilder.Entity<Pacientoveochorenium>(entity =>
        {
            entity.HasKey(e => new { e.Datumod, e.Rodnecislo, e.Kodochorenia }).HasName("xpkpacientoveochorenia");

            entity.ToTable("pacientoveochorenia", "bakalarka");

            entity.Property(e => e.Datumod).HasColumnName("datumod");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Kodochorenia)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("kodochorenia");
            entity.Property(e => e.Dalsiaspecifikacia).HasColumnName("dalsiaspecifikacia");
            entity.Property(e => e.Datumdo).HasColumnName("datumdo");

            entity.HasOne(d => d.KodochoreniaNavigation).WithMany(p => p.Pacientoveochorenia)
                .HasForeignKey(d => d.Kodochorenia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_6");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Pacientoveochorenia)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_5");
        });

        modelBuilder.Entity<Poistovna>(entity =>
        {
            entity.HasKey(e => e.Idpoistovne).HasName("xpkpoistovna");

            entity.ToTable("poistovna", "bakalarka");

            entity.Property(e => e.Idpoistovne)
                .ValueGeneratedNever()
                .HasColumnName("idpoistovne");
            entity.Property(e => e.Nazov)
                .HasMaxLength(30)
                .HasColumnName("nazov");
        });

        modelBuilder.Entity<SpecializaciaDoktor>(entity =>
        {
            entity.HasKey(e => new { e.Kodspecializacie, e.Osobnecislo }).HasName("xpkspecializacia_doktor");

            entity.ToTable("specializacia_doktor", "bakalarka");

            entity.Property(e => e.Kodspecializacie)
                .HasMaxLength(8)
                .HasColumnName("kodspecializacie");
            entity.Property(e => e.Osobnecislo)
                .HasMaxLength(10)
                .HasColumnName("osobnecislo");
            entity.Property(e => e.Datumnadobudnutia).HasColumnName("datumnadobudnutia");

            entity.HasOne(d => d.KodspecializacieNavigation).WithMany(p => p.SpecializaciaDoktors)
                .HasForeignKey(d => d.Kodspecializacie)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_16");

            entity.HasOne(d => d.OsobnecisloNavigation).WithMany(p => p.SpecializaciaDoktors)
                .HasForeignKey(d => d.Osobnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_17");
        });

        modelBuilder.Entity<Specializacium>(entity =>
        {
            entity.HasKey(e => e.Kodspecializacie).HasName("xpkspecializacia");

            entity.ToTable("specializacia", "bakalarka");

            entity.Property(e => e.Kodspecializacie)
                .HasMaxLength(8)
                .HasColumnName("kodspecializacie");
            entity.Property(e => e.Nazovspecializacie)
                .HasMaxLength(50)
                .HasColumnName("nazovspecializacie");
        });

        modelBuilder.Entity<Vysetrenie>(entity =>
        {
            entity.HasKey(e => e.Kod).HasName("vysetrenie_pk");

            entity.ToTable("vysetrenie", "bakalarka");

            entity.Property(e => e.Kod)
                .HasMaxLength(11)
                .HasColumnName("kod");
            entity.Property(e => e.Nazov).HasColumnName("nazov");

            entity.HasMany(d => d.Idzaznams).WithMany(p => p.Kods)
                .UsingEntity<Dictionary<string, object>>(
                    "VysetrenieZaznam",
                    r => r.HasOne<Zaznam>().WithMany()
                        .HasForeignKey("Idzaznam")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("vysetrenie_zaznam_fk"),
                    l => l.HasOne<Vysetrenie>().WithMany()
                        .HasForeignKey("Kod")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("vysetrenie_zaznam_fk_1"),
                    j =>
                    {
                        j.HasKey("Kod", "Idzaznam").HasName("vysetrenie_zaznam_pk");
                        j.ToTable("vysetrenie_zaznam", "bakalarka");
                    });
        });

        modelBuilder.Entity<Zaznam>(entity =>
        {
            entity.HasKey(e => e.Idzaznam).HasName("zaznam_pk");

            entity.ToTable("zaznam", "bakalarka");

            entity.Property(e => e.Idzaznam).HasColumnName("idzaznam");
            entity.Property(e => e.Cas).HasColumnName("cas");
            entity.Property(e => e.Datum).HasColumnName("datum");
            entity.Property(e => e.Doplnujuceinformacie).HasColumnName("doplnujuceinformacie");
            entity.Property(e => e.Dovodnavstevy)
                .HasMaxLength(50)
                .HasColumnName("dovodnavstevy");
            entity.Property(e => e.Osobnecislo)
                .HasMaxLength(10)
                .HasColumnName("osobnecislo");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("rodnecislo");
            entity.Property(e => e.Vykonanevysetrenia)
                .HasMaxLength(100)
                .HasColumnName("vykonanevysetrenia");
            entity.Property(e => e.Vysledokvysetrenia)
                .HasMaxLength(100)
                .HasColumnName("vysledokvysetrenia");
            entity.Property(e => e.Zaver)
                .HasMaxLength(100)
                .HasColumnName("zaver");

            entity.HasOne(d => d.OsobnecisloNavigation).WithMany(p => p.Zaznams)
                .HasForeignKey(d => d.Osobnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_27");

            entity.HasOne(d => d.RodnecisloNavigation).WithMany(p => p.Zaznams)
                .HasForeignKey(d => d.Rodnecislo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("r_26");
        });

        modelBuilder.Entity<Zaznamyzdielanie>(entity =>
        {
            entity.HasKey(e => new { e.Zdielajuci, e.Cielovy, e.Idzaznamu }).HasName("zaznamyzdielanie_pk");

            entity.ToTable("zaznamyzdielanie", "bakalarka");

            entity.Property(e => e.Zdielajuci)
                .HasMaxLength(7)
                .HasColumnName("zdielajuci");
            entity.Property(e => e.Cielovy)
                .HasMaxLength(7)
                .HasColumnName("cielovy");
            entity.Property(e => e.Idzaznamu).HasColumnName("idzaznamu");
            entity.Property(e => e.DatumdoZdielanie).HasColumnName("datumdo_zdielanie");

            entity.HasOne(d => d.CielovyNavigation).WithMany(p => p.ZaznamyzdielanieCielovyNavigations)
                .HasForeignKey(d => d.Cielovy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("zaznamyzdielanie_fk_1");

            entity.HasOne(d => d.IdzaznamuNavigation).WithMany(p => p.Zaznamyzdielanies)
                .HasForeignKey(d => d.Idzaznamu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("zaznamyzdielanie_fk_2");

            entity.HasOne(d => d.ZdielajuciNavigation).WithMany(p => p.ZaznamyzdielanieZdielajuciNavigations)
                .HasForeignKey(d => d.Zdielajuci)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("zaznamyzdielanie_fk");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
