using Hospital_Management.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management.Controllers
{

    [ApiController]
    [EnableCors("AllowLocalhost3000")]
    public class PrescriptionController : ControllerBase
    {
        private readonly IPrescriptionService _prescriptionService;

        public PrescriptionController(IPrescriptionService prescriptionService)
        {
            _prescriptionService = prescriptionService;
        }

        [Authorize]
        [HttpPost("doctor/uploadPrescription/{appointmentId}")]
        public async Task<IActionResult> UploadFile(long appointmentId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is missing");

            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            var prescription = await _prescriptionService.SavePrescriptionAsync(appointmentId.ToString(), file.ContentType, fileBytes);

            return Ok("File uploaded successfully!");
        }

        [Authorize]
        [HttpGet("patient/download/{appointmentId}")]
        public async Task<IActionResult> DownloadFile(long appointmentId)
        {
            var fileName = appointmentId.ToString();
            var prescription = await _prescriptionService.FindByNameAsync(fileName);

            if (prescription == null)
                return NotFound("Prescription not found");

            var extension = prescription.Type switch
            {
                "application/pdf" => ".pdf",
                "application/msword" => ".doc",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" => ".docx",
                _ => ""
            };

            var finalFileName = fileName + extension;
            return File(prescription.PrescriptionPdf, prescription.Type, finalFileName);
        }
    }
}
