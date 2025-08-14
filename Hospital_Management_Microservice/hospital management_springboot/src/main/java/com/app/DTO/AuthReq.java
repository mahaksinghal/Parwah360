package com.app.DTO;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthReq{
	@NotBlank(message = "Email can't be blank or null")
	private String email;
	@NotBlank(message = "password can't be blank or null")
	private String password;
	
}