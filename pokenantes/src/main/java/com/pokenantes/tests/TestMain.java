package com.pokenantes.tests;

import com.pokenantes.dao.*;

import com.pokenantes.dtos.*;

import com.pokenantes.actions.*;

public class TestMain {

	Dao dao;

	public static void main(String[] args) {
		
		// TODO Auto-generated method stub
	
		Fournisseur f1 = new Fournisseur( 10,"10 rue chanteclerc 44300 " , "entreprise", "0612020145", "pketests");
		Fournisseur f2 = new Fournisseur(11,"15 avenue de verdun 56000", "particulier","02560114587", "Lyaagar Mohcine");
		
		Article a1 = new Article(15, "mask", "noir", "m", "france", "neuf", "diver",50,"c:/mes images", "ar1502", f1);
		Article a2 = new Article(17, "cd", "", "", "france", "neuf", "film",50,"c:/mes images", "ar152", f2);
		
		//dao.addArticle(a1, f1);
		
	}

}
