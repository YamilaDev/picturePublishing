package com.picturePublishing.picturePublishing.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.picturePublishing.picturePublishing.model.User;
import com.picturePublishing.picturePublishing.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping(path = "/findByEmail")
	public ResponseEntity<?> findByEmail(@RequestBody User user) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			User userData = userService.findByEmail(user.getEmail());
			if (userData.getPassword().equals(user.getPassword())) {
				map.put("status", 0);
				map.put("data", userData);
				return new ResponseEntity<>(map, HttpStatus.OK);
			} else {
				map.put("status", 1);
				map.put("message", "Invalid password. Please try again");
				return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} catch (Exception e) {
			map.clear();
			map.put("status", 1);
			map.put("message", "Invalid email or password. Please try again");
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping(path = "/findByUserName")
	public ResponseEntity<?> findByUserName(@RequestBody User user) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		if (user.getPassword().equals("admin123") && user.getUserName().equals("admin")) {
			try {
				User userData = userService.findByUserName(user.getUserName());
				map.put("status", 0);
				map.put("data", userData);
				return new ResponseEntity<>(map, HttpStatus.OK);
			} catch (Exception e) {
				map.clear();
				map.put("status", 1);
				map.put("message", "Invalid username or password. Please try again");
				return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			map.put("status", 1);
			map.put("message", "Invalid username or password. Please try again");
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping(path = "/create")
	public ResponseEntity<?> create(@RequestBody User user) throws IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		try {
			userService.create(user);
			map.put("status", 0);
			map.put("data", user);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.clear();
			map.put("status", 1);
			map.put("message", "Error creating user");
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}