package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	List<Appointment> findByPatient_Id(Long patientId);
	
	List<Appointment> findByDoctor_Id(Long doctorId);

	List<Appointment> findAll();



}
