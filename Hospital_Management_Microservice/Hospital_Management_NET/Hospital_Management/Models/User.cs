using System;
using System.Collections.Generic;

namespace Hospital_Management.Models;

public partial class User
{
    public long Id { get; set; }

    public string? Email { get; set; }

    public string? Name { get; set; }

    public string? Password { get; set; }

    public string? Phone { get; set; }

    public string? Role { get; set; }
}
