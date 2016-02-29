package com.pokenantes.dao;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pokenantes.dtos.Article;

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
	private SessionFactory sessionFactory;

	/* Fonction de validation du nom & du mot de passe */
	public boolean validCredentials(String name, String password) {
		Session session = sessionFactory.openSession();
		Query query = session
				.createQuery("FROM Utilisateur where nomutilisateur= :name and motdepasseutilisateur= :password");
		query.setParameter("name", name);
		query.setParameter("password", password);
		if (query.uniqueResult() != null) {
			return true;
		}
		return false;

	}

	@SuppressWarnings("unchecked")
	public ArrayList<Article> fetchProducts() {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("FROM Article");
		return (ArrayList<Article>) query.list();
	}

}
