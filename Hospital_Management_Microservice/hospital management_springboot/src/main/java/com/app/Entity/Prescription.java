package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Prescription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String type;

	@Lob
	private byte[] prescriptionPdf; // Doctor's notes and prescribed medicine

	public Prescription(String name, String type, byte[] prescriptionPdf) {
		super();
		this.name = name;
		this.type = type;
		this.prescriptionPdf = prescriptionPdf;
	}

	public Prescription() {
	}

}
