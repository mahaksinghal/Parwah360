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
public class ResresponseDTO {

	private String patientName;
	private String doctorName;
	private String diseaseDescription;
	private String status;
	private LocalDate appointmentDate;

}
