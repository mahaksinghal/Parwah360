package com.app.Entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "patient_id")
	@JsonIgnore
	private Patient patient;

	@ManyToOne
	@JoinColumn(name = "doctor_id")
	@JsonIgnore
	private Doctor doctor;

	private LocalDate appointmentDate;
	private String diseaseDescription;
	private String status; // PENDING, ACCEPTED, REJECTED

	@OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
	private Payment payment;

}
