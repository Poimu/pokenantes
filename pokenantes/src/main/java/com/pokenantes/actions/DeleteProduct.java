package com.pokenantes.actions;

import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.Article;

@Action("/deleteProduct")
@ParentPackage("json-default")
@Result(type = "json", params = { "msg" })
public class DeleteProduct extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	int id;

	private ArrayList<Article> productsList;

	/* Les variables que l'on va renvoyer */
	private String msg;

	@Autowired
	private Dao dao;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ArrayList<Article> getProductsList() {
		return productsList;
	}

	public void setProductsList(ArrayList<Article> productsList) {
		this.productsList = productsList;
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

	public String execute() {

		if (dao.findById(id) != null) {
			System.out.println("Article à supprimer trouvé ");
			dao.deleteArticle(id);
			msg = "succes";

		} else
			msg = "echec";

		return ActionSupport.SUCCESS;
	}

}
