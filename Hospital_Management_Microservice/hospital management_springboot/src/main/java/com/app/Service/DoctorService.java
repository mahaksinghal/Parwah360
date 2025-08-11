package com.app.Service;

import java.util.List;

import com.app.DTO.DoctorDTO;
import com.app.DTO.DoctorDTOResponse;
import com.app.DTO.DoctorDtoImage;
import com.app.DTO.SpecializationDTO;

public interface DoctorService {

	List<DoctorDTOResponse> getAllDoctors();

	DoctorDTOResponse getDoctorById(Long id);

//	List<DoctorDTO> getDoctorsBySpecializationId(Long specializationId);

	// Optional<Long> getDoctorIdByUserId(Long userId);

	String addDoctor(DoctorDTO doctorDTO);

	List<DoctorDtoImage> getDoctorsBySpecializationId(Long specializationId);

	String updateDoctor(Long id, DoctorDTO doctorDTO);

	String updateSpecialization(Long specializationId, SpecializationDTO dto);

}
