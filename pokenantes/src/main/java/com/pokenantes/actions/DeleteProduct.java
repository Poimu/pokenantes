package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

@Action("/deleteProduct")
@ParentPackage("json-default")
@Result(type = "json", params = { "msg" })
public class DeleteProduct {

}
