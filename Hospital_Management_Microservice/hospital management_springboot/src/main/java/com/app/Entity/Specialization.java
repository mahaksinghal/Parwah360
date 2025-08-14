package com.app.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Specialization {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name; // Example: Cardiology, Neurology

	@Lob
	@Column(columnDefinition = "LONGBLOB") // To store image as BLOB
	private byte[] specializationimage;

	@OneToMany(mappedBy = "specialization", cascade = CascadeType.ALL)
	private List<Doctor> doctors;
	
}
