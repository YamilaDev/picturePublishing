package com.picturePublishing.picturePublishing;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.picturePublishing.picturePublishing.model.User;
import com.picturePublishing.picturePublishing.repository.UserRepository;
import com.picturePublishing.picturePublishing.service.UserService;

@SpringBootTest
class PicturePublishingApplicationTests {

	@Mock
	UserRepository userRepository;

	@InjectMocks
	UserService userService;

	@BeforeEach
	void setMockOutput() {
		System.out.println("**RUNNING TEST** userRepositoryMock");
		User user = new User();
		user.setId(1L);
		user.setEmail("admin@gmail.com");
		user.setPassword("admin123");
		user.setUserName("admin");
		when(userRepository.findUserByEmail("admin@gmail.com")).thenReturn(user);
		when(userRepository.findByUserName("admin")).thenReturn(user);
	}

	@DisplayName("Test Mock userRepository findByEmail")
	@Test
	void testGetFindByEmailt() throws IOException {
		System.out.println("**RUNNING TEST** loginByEmail userService");
		User uResponse = userService.findByEmail("admin@gmail.com");
		assertEquals("admin@gmail.com", uResponse.getEmail());

	}

	@DisplayName("Test Mock userRepository findByUserName")
	@Test
	void testGetFindByEmail() throws IOException {
		System.out.println("**RUNNING TEST** findByUserName userService");
		User uResponse = userService.findByUserName("admin");
		assertEquals("admin", uResponse.getUserName());

	}
}
