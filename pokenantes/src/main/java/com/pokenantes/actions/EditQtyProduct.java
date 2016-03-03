package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;

@Action("/addQuantity")
@ParentPackage("json-default")
@Result(type = "json", params = { "includeproperties", "msg, idarticle" })
public class EditQtyProduct extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private int idarticle;
	private int qteInit;
	private int qtyPlus;

	private String msg;

	@Autowired
	private Dao dao;

	public String execute() {
		var 
		dao.addQuantity((qtyTotal = qtyInit+qtyPlus),idarticle);
		msg = "success";
		return ActionSupport.SUCCESS;
	}
	public int getIdarticle() {
		return idarticle;
	}
	
	public void setIdarticle(int idarticle) {
		this.idarticle = idarticle;
	}
	
	public int getQteInit() {
		return qteInit;
	}

	public void setQteInit(int qteInit) {
		this.qteInit = qteInit;
	}

	public int getQtyPlus() {
		return qtyPlus;
	}

	public void setQtyPlus(int qtyPlus) {
		this.qtyPlus = qtyPlus;
	}

	public String getMsg() {
		return msg;
	}

}
