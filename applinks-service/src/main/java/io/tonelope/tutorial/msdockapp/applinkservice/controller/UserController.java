package io.tonelope.tutorial.msdockapp.applinkservice.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.tonelope.tutorial.msdockapp.applinkservice.common.ErrorCode;
import io.tonelope.tutorial.msdockapp.applinkservice.common.ErrorResponse;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.MongoUserRepository;
import io.tonelope.tutorial.msdockapp.applinkservice.dao.model.MongoUser;
import io.tonelope.tutorial.msdockapp.applinkservice.exception.ApplicationException;

@RestController
public class UserController {

	@Autowired
	private MongoUserRepository userRepository;
	
	@RequestMapping(value = "/user/active", method = RequestMethod.GET)
	public MongoUser getActiveUser(Principal principal) {
		return this.userRepository
				.findByCredentialsUsername(principal.getName())
				.orElseThrow(() -> new ApplicationException(ErrorResponse.of("No user is currently logged in.", 
						ErrorCode.AUTHENTICATION, HttpStatus.BAD_REQUEST)));
	}
}
