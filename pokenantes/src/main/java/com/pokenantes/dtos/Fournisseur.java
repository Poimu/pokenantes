package com.pokenantes.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FOURNISSEURS")
public class Fournisseur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idfournisseur;
	@Column(name = "NOMADRESSEFOURNISSEUR")
	private String nomadressefournisseur;
	@Column(name = "TYPEFOURNISSEUR")
	private String typefournisseur;
	@Column(name = "NUMTELFOURNISSEUR")
	private String numtelfournisseur;
	@Column(name = "NOMFOURNISSEUR")
	private String nomfournisseur;

	public Fournisseur() {
	}

}
