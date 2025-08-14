package com.app.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class DoctorDTO {
	private String email;
	private String password;
	private String name;
	private String phone;
	private String degree;
	private Long specializationId;
	private double amount;
	private MultipartFile doctorImage;

}
