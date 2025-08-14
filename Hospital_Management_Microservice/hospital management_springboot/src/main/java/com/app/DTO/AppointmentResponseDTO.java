package com.app.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponseDTO {
	private Long id;
	private LocalDate appointmentDate;
	private String diseaseDescription;
	private String status; // PENDING, ACCEPTED, REJECTED
	private String doctorName;
	private String doctorSpecialization;
	private String doctorPhone;
	private double amount;
	private String paymentStatus;
}
