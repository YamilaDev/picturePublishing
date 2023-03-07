package com.picturePublishing.picturePublishing.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.picturePublishing.picturePublishing.model.User;
import com.picturePublishing.picturePublishing.repository.UserRepository;

@Service
public class UserService implements IUserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public void create(User user) throws IOException {
		userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) throws IOException {
		return userRepository.findUserByEmail(email);
	}
	
	@Override
	public User findByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}
}