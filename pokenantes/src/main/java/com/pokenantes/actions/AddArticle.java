package com.pokenantes.actions;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.*;

@Action("/addProduct")
@ParentPackage("json-default")
@Result(type = "json", params = { "includeproperties", "msg, idarticle" })

public class AddArticle extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static File img;
	private static File imgDes;
	private static String destPath;
	private static String pictureUrl;
	private static String pictureFileName;
	private String myFileContentType;

	Article a;
	private int identifiant;
	private String nom;
	private String color;
	private String size;
	private String madeIn;
	private String condition;
	private String etat;
	private String type;
	private int quantity;
	private String code;

	Fournisseur F;
	private int idFournisseur;
	private String nomFournisseur;
	private String typeFournisseur;
	private String tel;
	private String adresse;
	
	String msg;

	@Autowired
	private Dao dao;
	
	

	public String execute() {
	
		copierImg();
		F = new Fournisseur( idFournisseur,  adresse,  typeFournisseur,  tel, nomFournisseur );
		a=new Article(identifiant, nom, color, size, madeIn, etat, type, quantity,pictureUrl,code, F);
		dao.addArticle(a, F);
		msg = "succes";
		
		return ActionSupport.SUCCESS;
	}

	public static void copierImg() { 
		destPath="pokenantes/src/main/webapp/uploadedImg";
		try {
           imgDes= new File(destPath, pictureFileName);
            FileUtils.copyFile(img, imgDes);
            System.out.println("Copy done to : " + destPath);
            pictureUrl = "uploadedImg/" + pictureFileName;
        } catch(IOException e) {
            e.printStackTrace();
        }	
		
		
	}

	public Article getA() {
		return a;
	}

	public static File getImg() {
		return img;
	}

	public static void setImg(File img) {
		AddArticle.img = img;
	}

	public static File getImgDes() {
		return imgDes;
	}

	public static void setImgDes(File imgDes) {
		AddArticle.imgDes = imgDes;
	}

	public static String getDestPath() {
		return destPath;
	}

	public static void setDestPath(String destPath) {
		AddArticle.destPath = destPath;
	}

	public static String getPictureUrl() {
		return pictureUrl;
	}

	public static void setPictureUrl(String pictureUrl) {
		AddArticle.pictureUrl = pictureUrl;
	}

	public static String getPictureFileName() {
		return pictureFileName;
	}

	public static void setPictureFileName(String pictureFileName) {
		AddArticle.pictureFileName = pictureFileName;
	}

	public String getMyFileContentType() {
		return myFileContentType;
	}

	public void setMyFileContentType(String myFileContentType) {
		this.myFileContentType = myFileContentType;
	}

	public int getIdentifiant() {
		return identifiant;
	}

	public void setIdentifiant(int identifiant) {
		this.identifiant = identifiant;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getMadeIn() {
		return madeIn;
	}

	public void setMadeIn(String madeIn) {
		this.madeIn = madeIn;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getIdFournisseur() {
		return idFournisseur;
	}

	public void setIdFournisseur(int idFournisseur) {
		this.idFournisseur = idFournisseur;
	}

	public String getNomFournisseur() {
		return nomFournisseur;
	}

	public void setNomFournisseur(String nomFournisseur) {
		this.nomFournisseur = nomFournisseur;
	}

	public String getTypeFournisseur() {
		return typeFournisseur;
	}

	public void setTypeFournisseur(String typeFournisseur) {
		this.typeFournisseur = typeFournisseur;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
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

	public void setA(Article a) {
		this.a = a;
	}

	public Fournisseur getF() {
		return F;
	}

	public void setF(Fournisseur f) {
		F = f;
	}

}
