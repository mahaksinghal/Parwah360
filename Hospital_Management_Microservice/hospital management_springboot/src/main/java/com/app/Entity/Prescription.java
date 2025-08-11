package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
@Entity
public class Prescription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String type;


	@Lob
	private byte[] prescriptionPdf; // Doctor's notes and prescribed medicine


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public byte[] getPrescriptionPdf() {
		return prescriptionPdf;
	}


	public void setPrescriptionPdf(byte[] prescriptionPdf) {
		this.prescriptionPdf = prescriptionPdf;
	}


	public Prescription(String name, String type, byte[] prescriptionPdf) {
		super();
		this.name = name;
		this.type = type;
		this.prescriptionPdf = prescriptionPdf;
	}

    
    public Prescription() {
    }
	
	
	
}
