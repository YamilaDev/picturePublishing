package com.picturePublishing.picturePublishing.repository;

import com.picturePublishing.picturePublishing.model.User;

public interface CustomUserRepository {

	User findUserByEmail(String email);

	User findByUserName(String userName);
}