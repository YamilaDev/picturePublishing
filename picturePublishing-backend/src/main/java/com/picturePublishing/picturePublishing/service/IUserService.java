package com.picturePublishing.picturePublishing.service;

import java.io.IOException;

import com.picturePublishing.picturePublishing.model.User;

public interface IUserService {

	public void create(User user) throws IOException;

	User findByEmail(String email) throws IOException;

	User findByUserName(String userName) throws IOException;
	
}
