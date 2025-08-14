package com.app.DTO;

import java.util.Base64;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DoctorDtoImage {
	private Long id;
    private String name;
    private String phone;
    private String degree;
    private double amount;
    private String specializationName;
    private String doctorImageBase64;


    public DoctorDtoImage(Long id, String name, String phone, String degree, double amount, String specializationName, byte[] doctorImage) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.degree = degree;
        this.amount = amount;
        this.specializationName = specializationName;
        this.doctorImageBase64 = doctorImage != null ? Base64.getEncoder().encodeToString(doctorImage) : null;
    }
}
