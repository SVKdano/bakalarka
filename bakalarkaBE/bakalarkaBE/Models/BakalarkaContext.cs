using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace bakalarkaBE.Models;

public partial class BakalarkaContext : DbContext
{
    public BakalarkaContext()
    {
    }

    public BakalarkaContext(DbContextOptions<BakalarkaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Pacient> Pacients { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=bakalarka;Username=daniellieskovsky;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pacient>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pacient", "zdravdoc");

            entity.Property(e => e.Datumnarodenia).HasColumnName("datumnarodenia");
            entity.Property(e => e.Kodpoistovne).HasColumnName("kodpoistovne");
            entity.Property(e => e.Meno)
                .HasMaxLength(20)
                .HasColumnName("meno");
            entity.Property(e => e.Priezvisko)
                .HasMaxLength(40)
                .HasColumnName("priezvisko");
            entity.Property(e => e.Psc)
                .HasMaxLength(5)
                .HasColumnName("psc");
            entity.Property(e => e.Rodnecislo)
                .HasMaxLength(11)
                .HasColumnName("rodnecislo");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
