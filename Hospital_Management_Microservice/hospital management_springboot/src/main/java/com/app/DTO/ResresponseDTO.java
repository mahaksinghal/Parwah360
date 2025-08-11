package com.app.DTO;

import java.time.LocalDate;

public class ResresponseDTO {

	private String patientName;
	private String doctorName;
	private String diseaseDescription;
	private String status;
	private LocalDate appointmentDate;

	// Constructors
	public ResresponseDTO() {
	}

	public ResresponseDTO(String patientName, String doctorName, String diseaseDescription, String status,
			LocalDate appointmentDate) {
		this.patientName = patientName;
		this.doctorName = doctorName;
		this.diseaseDescription = diseaseDescription;
		this.status = status;
		this.appointmentDate = appointmentDate;
	}

	// Getters and Setters
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDiseaseDescription() {
		return diseaseDescription;
	}

	public void setDiseaseDescription(String diseaseDescription) {
		this.diseaseDescription = diseaseDescription;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

}
