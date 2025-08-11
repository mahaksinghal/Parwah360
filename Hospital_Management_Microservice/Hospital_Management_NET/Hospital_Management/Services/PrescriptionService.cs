using Hospital_Management.Models;
using Hospital_Management.Repositories;

namespace Hospital_Management.Services
{
    public class PrescriptionService : IPrescriptionService
    {
        private readonly IPrescriptionRepository _repository;

        public PrescriptionService(IPrescriptionRepository repository)
        {
            _repository = repository;
        }

        public async Task<Prescription> SavePrescriptionAsync(string name, string type, byte[] fileData)
        {
            var prescription = new Prescription
            {
                Name = name,
                Type = type,
                PrescriptionPdf = fileData
            };

            return await _repository.SaveAsync(prescription);
        }

        public async Task<Prescription?> FindByNameAsync(string name)
        {
            return await _repository.FindByNameAsync(name);
        }
    }
}

