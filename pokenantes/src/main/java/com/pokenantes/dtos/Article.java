package com.pokenantes.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ARTICLES")
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idarticle;
	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "CLEFOURNISSEUR")
	private Fournisseur clefournisseur;
	@Column(name = "NOMARTICLE")
	private String nomarticle;
	@Column(name = "COULEURARTICLE")
	private String couleurarticle;
	@Column(name = "TAILLEARTICLE")
	private boolean taillearticle;
	@Column(name = "PROVENANCEARTICLE")
	private String provenancearticle;
	@Column(name = "ETATARTICLE")
	private String etatarticle;
	@Column(name = "TYPEARTICLE")
	private String typearticle;
	@Column(name = "QUANTITEARTICLE")
	private int quantitearticle;
	@Column(name = "PHOTOARTICLE")
	private String photoarticle;
	@Column(name = "CODEARTICLE")
	private String codearticle;

	public Article() {
	}
}
