using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class Specialization
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public byte[]? Specializationimage { get; set; }

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
}
