using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class Payment
{
    public long Id { get; set; }

    public double Amount { get; set; }

    public DateTime? Date { get; set; }

    public string? Paymentstatus { get; set; }

    public long? AppointmentId { get; set; }

    public virtual Appointment? Appointment { get; set; }
}
