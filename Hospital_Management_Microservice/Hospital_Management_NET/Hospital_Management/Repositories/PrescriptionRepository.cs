using Hospital_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management.Repositories
{
    public class PrescriptionRepository : IPrescriptionRepository
    {
        private readonly HospitalmanagementcdacContext _context;

        public PrescriptionRepository(HospitalmanagementcdacContext context)
        {
            _context = context;
        }

        public async Task<Prescription> SaveAsync(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            return prescription;
        }

        public async Task<Prescription?> FindByNameAsync(string name)
        {
            return await _context.Prescriptions.FirstOrDefaultAsync(p => p.Name == name);
        }
    }
}
