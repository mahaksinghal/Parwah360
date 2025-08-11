using Hospital_Management.Models;

namespace Hospital_Management.Services
{
    public interface IPrescriptionService
    {

        Task<Prescription> SavePrescriptionAsync(string name, string type, byte[] fileData);
        Task<Prescription?> FindByNameAsync(string name);
    }
}
