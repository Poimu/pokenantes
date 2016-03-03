package com.pokenantes.dao;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pokenantes.dtos.Article;
import com.pokenantes.dtos.Fournisseur;



/* @Repository indique qu'il s'agit d'un objet ayant pour vocation la gestion des données : Un DAO. */
@Repository
/*
 * @Transactional indique que l'on va effectuer des manips avec la base de
 * données.
 */
@Transactional(readOnly = true)
public class Dao {

	/*
	 * Une session factory indique que l'on va effectuer des transactions : on
	 * ouvre la porte de la base de données en ouvrant la sessionFactory.
	 */
	@Autowired
	private static SessionFactory sessionFactory;

	/* Fonction de validation du nom & du mot de passe */
	public boolean validCredentials(String name, String password) {
		Session session = sessionFactory.openSession();
		Query query = session
				.createQuery("FROM Utilisateur where nomutilisateur= :name and motdepasseutilisateur= :password");
		query.setParameter("name", name);
		query.setParameter("password", password);
		if (query.uniqueResult() != null) {
			session.close();
			return true;
		}
		session.close();
		return false;

	}

	@SuppressWarnings("unchecked")
	public ArrayList<Article> fetchProducts() {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("FROM Article");
		ArrayList<Article> productsList = (ArrayList<Article>) query.list();
		session.close();
		return productsList;
	}
	
	public Article addArticle(Article a,Fournisseur f) {
		AddFournisseur(f);
		Session session=sessionFactory.openSession();
		Query query =session.createQuery("From Article where idarticle =: id").setParameter("id", a.getIdarticle());
		
		if(query.uniqueResult()==null){
			 session.save(a);
			 return(a);
		
		 }else {
			 return ((Article)query.uniqueResult());
		 }			
		
	}
	 public static Fournisseur AddFournisseur(Fournisseur F)
	 {
		 Session session = sessionFactory.openSession();
		 Query query=session.createQuery("From Fournisseur where idfournisseur=: id ");
		 query.setParameter("id", F.getIdfournisseur());
		 if(query.uniqueResult()!=null)
		 {
			 return ((Fournisseur)query.uniqueResult());
		 }
		 else {
			 session.save(F);
			 session.close();
			 return(F);
			 
		 }
	 }

	@Transactional(readOnly = false)
	public void deleteProduct(int productId) {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("delete Article where idarticle = :productId");
		query.setParameter("productId", productId);
		int result = query.executeUpdate();
		if (result > 0) {
			System.out.println("Product removed");
		}
		session.close();
	}
	

}
