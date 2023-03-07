package com.picturePublishing.picturePublishing.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "EMAIL", nullable = false)
	public String email;

	@Column(name = "PASSWORD", nullable = false)
	public String password;

	@Column(name = "USER_NAME")
	public String userName;

	@Column(name = "ID_PERMISSION")
	public String idPermission;

	public User() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public String getIdPermission() {
		return idPermission;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setIdPermission(String idPermission) {
		this.idPermission = idPermission;
	}

}