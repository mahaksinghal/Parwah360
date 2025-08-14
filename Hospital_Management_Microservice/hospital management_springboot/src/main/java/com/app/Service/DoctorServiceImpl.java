package com.app.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.DoctorDTO;
import com.app.DTO.DoctorDTOResponse;
import com.app.DTO.DoctorDtoImage;
import com.app.DTO.SpecializationDTO;
import com.app.Entity.Doctor;
import com.app.Entity.Role;
import com.app.Entity.Specialization;
import com.app.Repository.DoctorRepository;
import com.app.Repository.SpecializationRepository;
import com.app.Repository.UserRepository;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SpecializationRepository specializationRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	public String addDoctor(DoctorDTO doctorDTO) {
		
		Doctor doctor = modelMapper.map(doctorDTO, Doctor.class);

		doctor.setRole(Role.ROLE_DOCTOR); // Enum role

		// Set specialization
		Specialization specialization = specializationRepository.findById(doctorDTO.getSpecializationId())
				.orElseThrow(() -> new RuntimeException("Specialization not found"));
		doctor.setSpecialization(specialization);

		// Convert image to byte[]
		if (doctorDTO.getDoctorImage() != null && !doctorDTO.getDoctorImage().isEmpty()) {
			try {
				doctor.setDoctorimage(doctorDTO.getDoctorImage().getBytes());
			} catch (IOException e) {
				throw new RuntimeException("Error processing image", e);
			}
		}

		doctorRepository.save(doctor);
		return "Doctor and User added successfully!";
	}

	public List<DoctorDTOResponse> getAllDoctors() {
		List<Doctor> doctors = doctorRepository.findAll();

		return doctors.stream().map(doctor -> new DoctorDTOResponse(doctor.getId(), doctor.getName(), 
				doctor.getDegree(), doctor.getAmount(),
				doctor.getSpecialization() != null ? doctor.getSpecialization().getName() : null))
				.collect(Collectors.toList());
	}

	// Get doctor by ID
	@Override
	public DoctorDTOResponse getDoctorById(Long id) {
		Doctor doctor = doctorRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Doctor with ID " + id + " not found"));

		System.out.println("Retrieved Doctor: " + doctor);

		// Convert entity to DTO response
		DoctorDTOResponse response = modelMapper.map(doctor, DoctorDTOResponse.class);
		response.setSpecializationName(doctor.getSpecialization() != null ? doctor.getSpecialization().getName() : null);
		return response;
	}

	public List<DoctorDtoImage> getDoctorsBySpecializationId(Long specializationId) {
		List<Doctor> doctors = doctorRepository.findBySpecializationId(specializationId);

		return doctors.stream()
				.map(doctor -> new DoctorDtoImage(doctor.getId(), doctor.getName(), doctor.getPhone(),
						doctor.getDegree(), doctor.getAmount(),
						doctor.getSpecialization() != null ? doctor.getSpecialization().getName() : null,
						doctor.getDoctorimage() // Ensure this is a byte[] field
				)).collect(Collectors.toList());
	}
	
	public String updateDoctor(Long id, DoctorDTO doctorDTO) {
		System.out.println("in update doctor " + id);
		
	    // Fetch doctor by ID or throw exception if not found
	    Doctor doctor = doctorRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));

	    // Update doctor details
	    doctor.setId(id);
	    doctor.setName(doctorDTO.getName());
	    doctor.setEmail(doctorDTO.getEmail());
	    doctor.setPassword(doctorDTO.getPassword());
	    doctor.setPhone(doctorDTO.getPhone());
	    doctor.setDegree(doctorDTO.getDegree());
	    doctor.setRole(Role.ROLE_DOCTOR);
	    doctor.setAmount(doctorDTO.getAmount());

	    // Fetch and set specialization
	    Specialization specialization = specializationRepository.findById(doctorDTO.getSpecializationId())
	            .orElseThrow(() -> new RuntimeException("Specialization not found"));
	    doctor.setSpecialization(specialization);

	    // Save updated doctor entity
	    doctorRepository.save(doctor);

	    return "Doctor updated successfully!";
	}


}
