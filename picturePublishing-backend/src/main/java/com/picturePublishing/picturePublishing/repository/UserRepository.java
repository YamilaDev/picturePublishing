package com.picturePublishing.picturePublishing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.picturePublishing.picturePublishing.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> , CustomUserRepository {


}