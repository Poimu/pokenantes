package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionSupport;

//Réceptionne le POST trylogin
@Action("/trylogin")
// Gère les données reçues comme un objet JSON
@ParentPackage("json-default")
// Le renvoie sera un objet JSON
@Result(type = "json", params = { "includeProperties", "msg, msg2" })
public class Login extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String msg;
	private String msg2;

	public String execute() {
		msg = "Message1";
		msg2 = "Message2";
		return ActionSupport.SUCCESS;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg2() {
		return msg2;
	}

	public void setMsg2(String msg2) {
		this.msg2 = msg2;
	}

}