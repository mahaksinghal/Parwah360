using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class Doctor
{
    public long Id { get; set; }

    public double Amount { get; set; }

    public string? Degree { get; set; }

    public byte[]? Doctorimage { get; set; }

    public string? Email { get; set; }

    public string? Name { get; set; }

    public string? Password { get; set; }

    public string? Phone { get; set; }

    public string? Role { get; set; }

    public long? SpecializationId { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual Specialization? Specialization { get; set; }
}
