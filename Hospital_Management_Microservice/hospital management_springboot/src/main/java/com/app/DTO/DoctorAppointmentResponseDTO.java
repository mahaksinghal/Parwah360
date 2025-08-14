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
public class DoctorAppointmentResponseDTO {
    private Long appointmentId;
    private LocalDate appointmentDate;
    private String diseaseDescription;
    private String status; // PENDING, ACCEPTED, REJECTED
    private Long patientId;
    private String patientName;
    private int patientAge;
    private String patientGender;
    private double patientWeight;
    private String patientEmail;


}
