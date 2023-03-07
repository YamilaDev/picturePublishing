package com.picturePublishing.picturePublishing.repository;

import com.picturePublishing.picturePublishing.model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomUserRepositoryImpl implements CustomUserRepository {
	@PersistenceContext
	private EntityManager entityManager;

	public User findUserByEmail(String email) {
		return (User) entityManager.createQuery("FROM User u WHERE u.email = :email")
				.setParameter("email", email)
				.getSingleResult();
	}

	@Override
	public User findByUserName(String userName) {
		return (User) entityManager.createQuery("FROM User u WHERE u.userName = :userName " ).setParameter("userName", userName)
		.getSingleResult();
	}

}
