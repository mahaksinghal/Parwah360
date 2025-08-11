using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class Prescription
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public byte[]? PrescriptionPdf { get; set; }

    public string? Type { get; set; }
}
