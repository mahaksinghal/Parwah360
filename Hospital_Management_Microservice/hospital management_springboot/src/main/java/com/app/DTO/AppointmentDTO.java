package com.app.DTO;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
    private Long patientId;
    private Long doctorId;
    private LocalDate appointmentDate;
    private String diseaseDescription;
}
