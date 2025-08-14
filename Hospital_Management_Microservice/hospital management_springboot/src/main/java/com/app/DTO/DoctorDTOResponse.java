package com.app.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTOResponse {
    
	private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String degree;
    private double amount;
    private String specializationName;

    public DoctorDTOResponse(Long id, String name, String degree, double amount, String specializationName) {
		this.id = id;
		this.name = name;
		this.degree = degree;
		this.amount = amount;
		this.specializationName = specializationName;
	}

}
