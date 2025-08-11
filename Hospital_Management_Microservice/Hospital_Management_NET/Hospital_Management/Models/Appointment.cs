using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class Appointment
{
    public long Id { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string? DiseaseDescription { get; set; }

    public string? Status { get; set; }

    public long? DoctorId { get; set; }

    public long? PatientId { get; set; }

    public virtual Doctor? Doctor { get; set; }

    public virtual Patient? Patient { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
