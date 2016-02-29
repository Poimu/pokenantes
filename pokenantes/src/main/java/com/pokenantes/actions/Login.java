package com.pokenantes.actions;

import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.Article;

//Réceptionne le POST trylogin
@Action("/trylogin")
// Gère les données reçues comme un objet JSON
@ParentPackage("json-default")
// Le renvoie sera un objet JSON et non pas une réorientation vers une page web.
@Result(type = "json", params = { "includeProperties", "msg, productsList" })
public class Login extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String utilisateur;
	private String motdepasse;

	/* Les variables que l'on va renvoyer */
	private String msg;
	private ArrayList<Article> productsList = new ArrayList<Article>();

	/*
	 * Rappel : Le DAO dans le modèle MVC correspond au modèle : c'est lui qui
	 * gère les données et accède à la base de données.
	 * 
	 * Plus d'infos sur l'annotation Autowired : http://tinyurl.com/h3ewhec
	 */
	@Autowired
	private Dao dao;

	public String execute() {
		/* on demande au DAO de vérifier si le nom/mdp correspondent */
		if (dao.validCredentials(utilisateur, motdepasse)) {
			System.out.println("USER FOUND");
			/*
			 * On demande au DAO de nous retourner la liste des articles :
			 * consultez la classe Dao
			 */
			productsList = dao.fetchProducts();
			msg = "success";
		} else {
			System.out.println("ERREUR");
			msg = "error";
		}
		return ActionSupport.SUCCESS;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(String utilisateur) {
		this.utilisateur = utilisateur;
	}

	public String getMotdepasse() {
		return motdepasse;
	}

	public void setMotdepasse(String motdepasse) {
		this.motdepasse = motdepasse;
	}

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public ArrayList<Article> getProductsList() {
		return productsList;
	}

	public void setProductsList(ArrayList<Article> productsList) {
		this.productsList = productsList;
	}

}