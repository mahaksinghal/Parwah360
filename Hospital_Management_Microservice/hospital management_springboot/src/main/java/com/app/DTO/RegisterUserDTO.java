package com.app.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterUserDTO {
	private String name;
	private String email;
	private String password;
	private String phone;
}
