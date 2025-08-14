package com.app.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SpecializationDTO {
    private Long id;
    private String name;
    private byte[] specializationImage; // Keep image as byte array
}

