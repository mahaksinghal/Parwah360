using Hospital_Management.Models;

namespace Hospital_Management.Repositories
{
    public interface IPrescriptionRepository
    {
        Task<Prescription> SaveAsync(Prescription prescription);
        Task<Prescription?> FindByNameAsync(string name);
    }
}
